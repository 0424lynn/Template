@echo off
setlocal enabledelayedexpansion
set "SITE_NAME=anime-figures-site"
set "DIST=dist"
set "REL=releases"
set "OUTZIP=%REL%\%SITE_NAME%.zip"

if exist "%DIST%" rmdir /S /Q "%DIST%"
if exist "%REL%"  rmdir /S /Q "%REL%"
mkdir "%DIST%" 2>nul
mkdir "%REL%"  2>nul

echo Copying files...
xcopy /E /I /Y index.html "%DIST%\"
xcopy /E /I /Y catalog.html "%DIST%\"
xcopy /E /I /Y about.html "%DIST%\"
xcopy /E /I /Y shipping.html "%DIST%\"
xcopy /E /I /Y faq.html "%DIST%\"
xcopy /E /I /Y contact.html "%DIST%\"
xcopy /E /I /Y cart.html "%DIST%\"
xcopy /E /I /Y product.html "%DIST%\" 2>nul
xcopy /E /I /Y style.css "%DIST%\"
xcopy /E /I /Y app.js "%DIST%\"
xcopy /E /I /Y README.md "%DIST%\" 2>nul
xcopy /E /I /Y assets "%DIST%\assets\" 2>nul
xcopy /E /I /Y picture "%DIST%\picture\" 2>nul

echo Creating ZIP...
powershell -Command "Compress-Archive -Path '%DIST%\*' -DestinationPath '%OUTZIP%' -Force"

for %%F in ("%OUTZIP%") do certutil -hashfile "%%~fF" SHA256 > "%OUTZIP%.sha256.txt"

echo Done!
echo => %OUTZIP%
endlocal
