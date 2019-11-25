#!/bin/bash

usage()
{
  echo "Usage:
./addpiece.sh
  --id some-asshole \\
  --filename-id some-asshole \\
  --title-of-work 'Some Asshole' \\
  --width 1920 \\
  --height 1080 \\
  --short-description 'Lorem ipsum' \\
  --source-image ./src-assets/some-asshole.png"
}

# https://stackoverflow.com/a/14203146/214325
# POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -i|--id)
    ID="$2"
    FILENAME_ID="$2"
    shift # past argument
    shift # past value
    ;;
    -f|--filename-id)
    FILENAME_ID="$2"
    shift # past argument
    shift # past value
    ;;
    -t|--title-of-work)
    TITLE_OF_WORK="$2"
    shift # past argument
    shift # past value
    ;;
    -w|--width)
    WIDTH="$2"
    WIDTH_HALF=$(expr $2 / 2)
    WIDTH_QUARTER=$(expr $2 / 4)
    shift # past argument
    shift # past value
    ;;
    -h|--height)
    HEIGHT="$2"
    HEIGHT_HALF=$(expr $2 / 2)
    HEIGHT_QUARTER=$(expr $2 / 4)
    shift # past argument
    shift # past value
    ;;
    -sd|--short-description)
    SHORT_DESCRIPTION="$2"
    shift # past argument
    shift # past value
    ;;
    -si|--source-image)
    SOURCE_IMAGE="$2"
    shift # past argument
    shift # past value
    ;;
    *)    # unknown option
    echo -e "Unrecognized option: $1"
    usage
    exit
    # POSITIONAL+=("$1") # save it in an array for later
    # shift # past argument
    ;;
esac
done
# set -- "${POSITIONAL[@]}" # restore positional parameters

FILE_DIR="src/og-$FILENAME_ID"
FILE_PATH="$FILE_DIR/og-$FILENAME_ID.html"

IMAGE_DIR="src/images/$FILENAME_ID"
IMAGE_PATH="$IMAGE_DIR/“$(echo $TITLE_OF_WORK)” by Oliver Guiney.png"

[[ -z "$FILENAME_ID" ]] || mkdir -p $FILE_DIR && mkdir -p $IMAGE_DIR
[[ -z "$SOURCE_IMAGE" ]] || cp "$SOURCE_IMAGE" "$IMAGE_PATH"

# find ./src/images/ -name \"*.png\" -exec guetzli --verbose --quality 84 {} {}.jpg \\; && rename \"s/png.jpg/jpg/\" ./src/images/*.png.jpg
# find . -name "*.png" -exec guetzli --verbose --quality 84 {} {}.jpg \; && rename "s/png.jpg/jpg/" ./src/images/*.png.jpg

COMPONENT=$(cat <<EOF
<link rel="import" href="../../bower_components/polymer/polymer.html" />
<link rel="import" href="../shared-styles/shared-styles.html" />

<dom-module id="og-$ID">
  <template>
    <style include="shared-styles"></style>
    <og-portfolio__piece
      id="$ID"
      filename-id="$FILENAME_ID"
      title-of-work="$TITLE_OF_WORK"
      short-description="$SHORT_DESCRIPTION"
      resolutions='[
        { "width": "$WIDTH", "height": "$HEIGHT", "zoomLevel": "", "types": [ "jpg" ] },
        { "width": "$WIDTH_HALF", "height": "$HEIGHT_HALF", "zoomLevel": "@0,5x", "types": [ "jpg" ] },
        { "width": "$WIDTH_QUARTER", "height": "$HEIGHT_QUARTER", "zoomLevel": "@0,25x", "types": [ "jpg" ] }
      ]'>
    </og-portfolio__piece>
  </template>
  <script>
    Polymer({
      is: 'og-$ID'
    });
  </script>
</dom-module>
EOF)

echo "$COMPONENT" > $FILE_PATH