@echo off
title 数据可视化平台 启动器
color 0a

echo ==============================
echo   数据可视化平台 一键启动
echo ==============================

:: 启动后端
echo 启动后端...
cd backend

start cmd /k "python app.py"
cd ..

:: 启动前端
echo 启动前端...
cd frontend
start cmd /k "npm run dev"
cd ..

echo 前后端已启动完成！
pause
