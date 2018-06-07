# Wiki

Contains all HTML, CSS and JS content that will be found on http://2018.igem.org/Team:Virginia.

## Todo

- Create an upload.js script to map and upload files to destinations on the iGEM wiki with igemwiki-api
- Add bower, enabling bootstrap and future packages as managed dependencies
- Use Handlebars to establish local and web builds which correctly manage local/web images, CSS and JS.

## Roadmap

1. Write an upload script using igemwiki-api to push all pages, images and other content to the iGEM wiki.
2. Create basic template using Codekit + Handlebars or some other build tool that can compile to working HTML for both the iGEM wiki and local machine testing.
    - Template should have a header and a footer that contain a snazzy navbar and team information respectively.
    - Template should also contain styling that allows for quick development of webpages
    - Ideally, template can be written in markdown and compiled to enable other team members to edit things fairly easily.
3. Decide on a goddamn colorscheme
4. Core concurrent tasks:
    - Finish all major pages, at least with filler content
    - Code interactive for home page

## Interactive

This is an interactive presentation that gives the reader an intuition for what our device is doing. It goes fairly simply:

1. Start with an empty "petri dish" that looks like it's just part of the webpage. A little "click me" prompt gets the user to interact with it.
2. When the user clicks, they will add a single E. Coli, a CFU, to the dish
3. The user can then incubate the cell and it will divide to form a few cells
4. When the cells hit quorum, many will begin to flash a bright blue color to indicate their genes have been activated; but only about 50% will flash initially.
5. The user can then sterilize/clean the dish with a button, and switch to the Virginia iGEM quorum sensing genes
    - Maybe have a short animatic where the user transforms some bacteria
6. Upon redoing the experiment, they'll find that nearly all the bacteria flash
7. User is left to play around with the sandbox all they want. A little flashing blue arrow at the bottom of the game prompts them to scroll down to read about the project.

## Attributions and Works Cited
- University of Toronto: igemwiki-api
- iGEM Peshawar 2016: General information regarding wiki development
- Bootstrap 3.3.7
-
