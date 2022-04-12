from builder.utility.csv import read
from builder.utility.encoding import fix_errors


def game(file) -> str:
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
    title_method = file["method"].replace("_", " ").title()
    title_level = file["level"].upper()
    title_year = file["year"]
    title_name = file["name"].upper()
    title_direction = file["direction"].upper()

    title = f"{title_method} {title_level} {title_year} {title_name} ({title_direction})"

    # Replace the template
    template = template.replace("{words}", str(wordList))
    template = template.replace("{title}", title)
    template = template.replace("{word_list_name}", title.lower().replace(" ", "_"))

    # Fix encoding errors
    template = fix_errors(template)

    # Return the page
    return template