@echo off
:: build site , could have been in --draft mode so force a re-build
REM "building site"
jekyll build
@echo off


:: delete the map files
REM "cleaning up sass"

:: re-build and minify ALL the sass
:: sass --force --update styles:styles --style compressed

:: site is ready to launch...now what?
@pause