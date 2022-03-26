import re

from html.parser import HTMLParser


def reconstruct_element(tag, attrs) -> str:
    """
    Reconstructs an element from its tag and attributes.
    :param tag: Tag of the element
    :param attrs: Attributes of the element
    :return: Reconstructed element
    """
    element = f"<{tag}"
    for key, value in attrs.items():
        element += f' {key}="{value}"'
    element += ">"
    return element


def get_elements_by_tag_name(html, request_tag) -> list:
    '''
    Get all elements by tag name
    :param html: HTML document
    :param request_tag: Tag name
    :return: List of elements
    '''

    class Parser(HTMLParser):
        results = []

        def handle_starttag(self, tag, attrs):
            if tag == request_tag:
                self.results.append(dict(attrs))

    parser = Parser()
    parser.feed(html)
    return parser.results


def append_child(html, parent, child) -> str:
    '''
    Append child to parent
    :param html: HTML document
    :param parent: Parent element
    :param child: Child element
    :return: HTML document with child appended to parent
    '''
    start = f"<{parent}>"
    end = f"</{parent}>"
    current_content = html[html.index(start)+len(start):html.index(end)]
    content = current_content + child
    html = html.replace(current_content, content)

    return html