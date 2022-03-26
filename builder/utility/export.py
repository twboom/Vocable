import os

from builder.utility.include import css as include_css
from builder.utility.minifier import html as minify_html


def export_game_page(file, html):
    """
    Exports the game page for the given file.
    :param file: The file object to export the page for.
    :param html: The HTML code of the page.
    """
    # Get the correct path
    path = f"build/{file['language']}/{file['method']}/{file['level']}/{file['year']}"

    # Create the folder
    os.makedirs(path, exist_ok=True)
    file_name = file["name"].replace(".csv", ".html")

    # Include CSS
    html = include_css(html)
    html = minify_html(html)

    # Write the file
    with open(f"{path}/{file_name}", "w", encoding="utf-8") as f:
        f.write(html)