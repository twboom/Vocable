from builder.utility.csv import read
from builder.utility.encoding import fix_errors


def build_row(word) -> str:
    """
    Builds a row for the table.
    :param word: The word to build the row for.
    :return: The HTML code of the row.
    """
    
    original = word["word"]
    translation = word["translation"]
    comment = word["comment"]

    html = f"<tr><td>{original}</td><td>{translation}</td><td>{comment}</td></tr>"

    return html


def table(file) -> str:
    """
    Builds the table page for the give file.
    :param file: The file object to build the page for.
    :return: The HTML code of the page.
    """
    print(f" -> Building table page for '{file['full_name']}'")

    # Import the file
    wordList = read(file["path"], header=True, seperator=";")

    # Generate the table rows
    content = [build_row(word) for word in wordList]
    content = '\n'.join(content)

    # Get the template
    with open("app/table.html", "r", encoding="utf-8") as f:
        template = f.read()

    # Build the title
    title_method = file["method"].capitalize()
    title_level = file["level"].upper()
    title_year = file["year"]

    title = f"{title_method} {title_level} {title_year}"

    # Replace the template
    template = template.replace("{table_body}", content)
    template = template.replace("{title}", title)

    # Fix encoding errors
    template = fix_errors(template)

    # Return the page
    return template