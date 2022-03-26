from builder.utility.encoding import fix_errors


def read(file, header=False, seperator=";") -> list:
    """
    Reads the file and returns a list of lines.
    @param file: The file to read.
    @param header: If the file has a header.
    @return: A list of dictionaries.
    """
    with open(file, 'r') as f:
        lines = f.readlines()
        lines =[line.replace("\n", "") for line in lines]

    # Fix text encoding issues
    corrected_lines = []
    for line in lines:
        line = fix_errors(line)
        corrected_lines.append(line)

    lines = corrected_lines

    # Split the lines
    lines = [line.split(seperator) for line in lines]

    # If the file has a header, parse it header like
    if header:
        header = lines[0]
        lines = lines[1:]

        # Create a list of dictionaries
        lines = [dict(zip(header, line)) for line in lines]
    return lines