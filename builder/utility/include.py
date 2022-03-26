from builder.utility.dom import append_child, get_elements_by_tag_name, reconstruct_element
from builder.utility.minifier import css as minify_ccs


def css(html) -> str:
    """
    Include CSS files in the HTML document.
    :param html: HTML document
    :return: HTML document with CSS files included
    """
    css_files = []
    css_files_attrs = []
    files = get_elements_by_tag_name(html, 'link')
    for file in files:
        if file['rel'] == 'stylesheet':
            css_files_attrs.append(reconstruct_element('link', file))
            css_files.append(file['href'])

    css_html = ''
    for file in css_files:
        with open(f'app/{file}', 'r') as f:
            css_html += f.read()
    css_html = minify_ccs(css_html)
    css_html = f'<style>{css_html}</style>'

    html = append_child(html, 'head', css_html)

    # Remove the old css links
    for file in css_files_attrs:
        html = html.replace(file, '')

    return html