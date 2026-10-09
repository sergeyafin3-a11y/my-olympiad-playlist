"""Проставляет в index.html метку ?v=<отпечаток> у всех своих скриптов.

Отпечаток — sha1 содержимого всех подключаемых js/data файлов: меняется
только когда меняется код или данные, поэтому лишний раз кэш не сбрасывается.
"""
import hashlib
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
SRC = re.compile(r'<script src="((?!http)[^"?]+)(\?v=[0-9a-f]*)?"')


def local_scripts(html):
    return [m.group(1) for m in SRC.finditer(html)]


def fingerprint():
    html = INDEX.read_text(encoding="utf-8")
    h = hashlib.sha1()
    for path in local_scripts(html):
        h.update(path.encode())
        h.update((ROOT / path).read_bytes())
    return h.hexdigest()[:10]


META = re.compile(r'<meta name="app-version" content="[0-9a-f]*">')


def page_version():
    """Версия всей страницы: сама index.html (без своей метки) + все скрипты.
    По ней открытая страница понимает, что на сервере уже новая, и перезагружается."""
    html = META.sub('<meta name="app-version" content="">', INDEX.read_text(encoding="utf-8"))
    return hashlib.sha1((html + fingerprint()).encode()).hexdigest()[:10]


def main():
    v = fingerprint()
    html = INDEX.read_text(encoding="utf-8")
    INDEX.write_text(SRC.sub(lambda m: '<script src="%s?v=%s"' % (m.group(1), v), html), encoding="utf-8")
    pv = page_version()
    INDEX.write_text(META.sub('<meta name="app-version" content="%s">' % pv, INDEX.read_text(encoding="utf-8")), encoding="utf-8")
    (ROOT / "version.json").write_text('{"v":"%s"}\n' % pv, encoding="utf-8")
    print("version", v, "page", pv)


if __name__ == "__main__":
    main()
