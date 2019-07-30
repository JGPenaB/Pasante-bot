# -*- coding: utf-8 -*-
# Importamos el print que se usa en Python 3 (lo ideal seria que solo funcione
# en Python 2 pero el interprete no lo acepta de esa manera)
from __future__ import print_function
import sys
import os
import re
import threading
import queue
import time
import gettext

if sys.version_info.major == 2:
    from urllib2 import build_opener, URLError
else:
    from urllib import request
    import urllib.error
    
    build_opener = urllib.request.build_opener
    URLError = urllib.error.URLError    

# flags
subfolder = None
overwrite = None
update    = None
debug     = None

# shared stuff
nbitsmutx = threading.Lock()
nbits     = 0

# Expresiones regulares para evitar escribir código innecesariamente complejo
adjuntos = re.compile('<span class="file(?:namereply|size)">[\r\n]+<a[\s\r\n]+target="_blank"[\s\r\n]+href="([^"]+)"(?:[\s\S]*?)<span class="nombrefile"(?:>, ([^<]+)| title="([^"]+))')
# Detecta el tablón e ID del hilo de un enlace completo o en la forma corta: "/tablón/hilo". 
enlace = re.compile("(?i)^(?:(?:(?:(?:https?://)?(?:[a-z]+[.])?)?hispachan[.]org/)?|/?)?([a-z]+)/(?:res/)?([0-9]+)(?:[.]html)?")

# Dispara la excepcion o devuelve False dependiendo en base al parametro debug
def debugger(excepcion, show_exception = False):
    if debug == True: raise excepcion
    else:
        if show_exception == True: print("error:", e)
        return False

# Devuelve un objeto para manejar peticiones HTTP o False en caso de una excepcion
def url_opener(url, time_out):
    useragent = 'Mozilla/5.0'
    opener = build_opener()
    opener.addheaders = [
        ('User-agent', useragent)
    ]
    try:
        return opener.open(url, timeout=time_out)
    except URLError as e:
        debugger(e)
    except Exception as e:
        debugger(e)

def getthreadinfo(url):
    r = enlace.match(url)
    if r:
        return r.groups()
    print("Error: url invalida")
    exit(1)

def getimglist(url):
    f = url_opener(url, 20)
    b = f.read()
    f.close()

    return adjuntos.findall(b.decode('utf-8'))

def subproc(iqueue, oqueue):
    while True:
        tmp = iqueue.get()
        if not tmp:
            break

        if saveimg(tmp[0], tmp[1]):
            oqueue.put((tmp[0], True))
            continue
        oqueue.put((tmp[0], False))

def saveimg(url, path):
    global nbits
    global nbitsmutx

    f = url_opener(url, 120)

    if os.path.isfile(path):
        if update:
            try:
                sz1 = int(f.info()["Content-Length"])

                fh = open(path, "rb")
                fh.seek(0, 2)
                sz2 = fh.tell()
                fh.close()
            except Exception as e:
                debugger(e)

            if sz1 == sz2:
                return True

        # si el archivo existe intentamos con un nuevo nombre
        if not update and not overwrite:
            fnme, fext = os.path.splitext(path)

            i = 1
            while os.path.isfile(path):
                path = fnme + "(" + str(i) +")" + fext
                i += 1

    try:
        fh = open(path, "wb")
        while True:
            b = f.read(4096)
            if not b:
                break

            nbitsmutx.acquire()
            nbits += len(b)
            nbitsmutx.release()

            fh.write(b)
        fh.close()
    except (IOError, URLError) as e:
        debugger(e)
    except Exception as e:
        debugger(e)
    return True

def saveimages(ilist, dpath):
    global nbits

    path = os.path.abspath(dpath)
    try:
        os.makedirs(path)
    except OSError as e:
        if e.errno == os.errno.EEXIST:
            print('El directorio %s ya se habia creado con anterioridad' % dpath)
        else:
            raise

    print("Descargando {} imágenes en \n[{}]".format(len(ilist), path))

    iqueue = queue.Queue()
    oqueue = queue.Queue()

    threads = []
    for i in range(4):
        thr = threading.Thread(target=subproc, args=(iqueue, oqueue))
        thr.daemon = True
        thr.start()
        threads.append(thr)

    for img in ilist:
        if not img[0]:
            continue

        link = img[0]
        name = img[1]
        if img[2]:
            name = img[2]
        iqueue.put((link, os.path.join(path, name)))

    f = 0
    i = 0
    try:
        while i < len(ilist):
            while not oqueue.empty():
                r = oqueue.get()
                
                print("\r..." + r[0][8:], end=" ")
                if not r[1]:
                    print("[FAILED]", end="")
                    f += 1
                print()
                i += 1

            print("\r{}Kb".format(nbits >> 10), end="")
            time.sleep(0.15)
    except KeyboardInterrupt:
        exit(1)

    print("\r{}Kb".format(nbits >> 10))
    print("Terminado: archivos descargados {}, errores {}".format(i - f, f))

# Traducimos algunos mensajes, para agregar mas idiomas véase también https://stackoverflow.com/questions/22951442/how-to-make-pythons-argparse-generate-non-english-text/28836537#28836537
def convertArgparseMessages(s):
    subDict = \
    {'positional arguments':'Argumentos posicionales',
    'optional arguments':'Argumentos opcionales',
    'usage: ':'Uso: ',
    'the following arguments are required: %s':'los siguientes parámetros son requeridos: %s'
    #'show this help message and exit':'Affiche ce message et quitte'
    }
    if s in subDict:
        s = subDict[s]
    return s

gettext.gettext = convertArgparseMessages
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(add_help=False, description=('Descarga los archivos adjuntos de un hilo de Hispachan.'))
    parser.add_argument('url', help='Enlace del hilo o identificador en la forma "tablón/hilo".')
    parser.add_argument('destino', nargs='?', help='Directorio en donde se guardaran los archivos (por defecto se descargan en el directorio actual).', default=os.getcwd())
    parser.add_argument( '-h', '-help', action='help', default=argparse.SUPPRESS, help='Muestra este mensaje de ayuda y sale.')
    parser.add_argument('-n', '-no-subfolder', dest='subfolder', help='Omite la creación de una subcarpeta para las imágenes.', default=True, action='store_false')
    parser.add_argument('-o', '-overwrite', dest="overwrite", help='Sobrescribe los archivos con el mismo nombre.', default=False, action='store_true')
    parser.add_argument('-u', '-update', dest="update", help='Solo descarga los archivos que no existen.', default=False, action='store_true')
    parser.add_argument('-d', '-debug', dest="debug",  help='Dispara las excepciones para facilitar la detección de bugs.', default=False, action='store_true')

    # Si no hay enlace entonces se muestra la ayuda y sale
    if len(sys.argv)==1:
        parser.print_help()
        sys.exit(1)
    
    args = parser.parse_args(sys.argv[1:])
    
    # Asignamos algunas variables globales predefinidas en el script
    s = globals()
    for option in ["subfolder", "overwrite", "update", "debug"]:
        s[option] = getattr(args, option)

    r = getthreadinfo(args.url)

    url = "https://hispachan.org/{}/res/{}.html".format(r[0], r[1])
    try:
        ilist = getimglist(url)
        if not ilist:
            print("error: ningún archivo para descargar")
            exit()

        dpath = args.destino
        
        if subfolder:
            dpath = os.path.join(dpath, "imgs")
            
        saveimages(ilist, dpath)
    except KeyboardInterrupt:
        exit(1)
    except Exception as e:
        debugger(e, True)
