@echo off
echo ==================================================
echo  TripMate - Compiling and Running Java Backend
echo ==================================================

where javac >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: javac (Java Development Kit) not found on PATH.
    pause
    exit /b
)

if not exist bin mkdir bin

echo Compiling Java classes...
javac -d bin src\com\tripmate\models\*.java src\com\tripmate\services\*.java src\com\tripmate\data\*.java src\com\tripmate\TripMateServer.java

if %errorlevel% neq 0 (
    echo Compilation failed.
    pause
    exit /b
)

echo Starting TripMate Java REST API Server on port 5000...
java -cp bin com.tripmate.TripMateServer
pause
