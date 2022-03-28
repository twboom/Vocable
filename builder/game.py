from builder.utility.csv import read
from builder.utility.encoding import fix_errors


def build_game_page(file) -> str:
    """
    Builds the game page for the given file.
    :param file: The file object to build the page for.
    :return: The HTML code of the page.
    """

    print(f" -> Building game page for '{file['full_name']}'")

    # Import the file
    wordList = read(file["path"], header=True, seperator=";")

    # Get the template
    with open("app/game.html", "r", encoding="utf-8") as f:
        template = f.read()

    # Build the title
    title_method = file["method"].capitalize()
    title_level = file["level"].upper()
    title_year = file["year"]

    title = f"{title_method} {title_level} {title_year}"

    # Replace the template
    template = template.replace("{words}", str(wordList))
    template = template.replace("{title}", title)

    # Fix encoding errors
    template = fix_errors(template)

    # Return the page
    return template