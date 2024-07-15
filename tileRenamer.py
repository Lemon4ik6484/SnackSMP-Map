import os
import re
import pathlib

# Функция для переименования файлов
def rename_files(directory):
    # Регулярное выражение для поиска файлов в формате 3_3_x-1536_z-1024.png
    pattern = re.compile(r'(\d+)_(\d+)_x-?\d+_z-?\d+\.png')

    # Проходим по всем файлам в указанной директории
    for filename in os.listdir(directory):
        # Проверяем, соответствует ли имя файла заданному шаблону
        match = pattern.match(filename)
        if match:
            # Извлекаем цифры из имени файла
            new_name = f"{match.group(1)},{match.group(2)}.png"
            # Получаем полный путь к файлу
            old_path = directory / filename
            new_path = directory / new_name
            # Переименовываем файл
            os.rename(old_path, new_path)
            print(f"Renamed: {old_path} -> {new_path}")

# Определяем директорию с использованием pathlib
directory = pathlib.Path(__file__).parent.resolve() / 'MapTiles'

# Пример использования функции
rename_files(directory)
