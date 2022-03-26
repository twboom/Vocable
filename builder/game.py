from builder.utility.csv import read
from builder.utility.encoding import fix_errors


def build_game_page(file) -> str:
    """
    Builds the game page for the given file.
    :param file: The file object to build the page for.
    :return: The HTML code of the page.
    """
    # Import the file
    lines = read(file["path"], header=True, seperator=";")
    
    # Ignore words with spaces
    wordList = [line for line in lines if " " not in line["word"]]

    # Get the template
    with open("app/game.html", "r", encoding="utf-8") as f:
        template = f.read()

    # Replace the template
    template = template.replace("{words}", str(wordList))
    template = template.replace("{title}", "Vocable")

    # Fix encoding errors
    template = fix_errors(template)

    # Return the page
    return template