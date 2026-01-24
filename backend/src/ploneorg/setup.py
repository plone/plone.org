"""Installer for the ploneorg package."""
from setuptools import find_packages
from setuptools import setup


long_description = "\n\n".join(
    [
        open("README.md").read(),
        open("CONTRIBUTORS.md").read(),
        open("CHANGES.md").read(),
    ]
)


setup(
    name="ploneorg",
    version="1.0.0a1",
    description="Plone.org Site configuration package.",
    long_description=long_description,
    classifiers=[
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: Addon",
        "Framework :: Plone :: 6.0",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Operating System :: OS Independent",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
    ],
    keywords="Python Plone CMS",
    author="Plone Foundation",
    author_email="marketing@plone.org",
    url="https://github.com/plone/plone.org",
    project_urls={
        "PyPI": "https://pypi.python.org/pypi/ploneorg",
        "Source": "https://github.com/plone/plone.org",
        "Tracker": "https://github.com/plone/plone.org/issues",
    },
    license="GPL version 2",
    packages=find_packages("src", exclude=["ez_setup"]),
    package_dir={"": "src"},
    include_package_data=True,
    zip_safe=False,
    python_requires=">=3.8",
    install_requires=[
        "setuptools",
        "Plone",
        "prettyconf",
        "kitconcept.api",
        "plone.app.vulnerabilities",
        "collective.exportimport",
        "pas.plugins.authomatic>=1.2.0",
        "pycountry",
        "collective.volto.formsupport[honeypot]",
        "collective.honeypot",
        "collective.volto.dropdownmenu",
        "collective.volto.secondarymenu",
        "collective.volto.socialsettings",
        "collective.casestudy",
        "collective.revisionmanager",
    ],
    extras_require={
        "test": [
            "gocept.pytestlayer<8.1.1",
            "parameterized",
            "zest.releaser[recommended]",
            "plone.app.testing[robot]>=7.0.0a3",
            "plone.restapi[test]",
            "collective.MockMailHost",
            "Products.PrintingMailHost",
            "pytest",
        ],
    },
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    [console_scripts]
    update_locale = ploneorg.locales.update:update_locale
    """,
)
