import random
from typing import Final
import flask as f
import glob
import shutil

song_copy_path: Final[str] = "C:\\Zeyrux\\Websites\\MusicPlayer\\static\\songs\\"
files: list[str] = glob.glob("C:\\Users\\tappe\\Music\\*\\*.mp3")
songs: list[str] = []
current_song_id = -1

def copy_file():
    global songs, current_song_id
    current_song_id += 1
    songs.append(files[random.randint(0, len(files))])
    shutil.copy(src=songs[-1], dst=f"{song_copy_path}song{str(current_song_id)}.mp3")

app = f.Flask(__name__)

copy_file()

@app.route("/", methods=["GET"])
def index():
    volume = f.request.args.get("volume")
    if volume == None:
        volume = 5
    copy_file()
    print(songs[-1][songs[-1].rindex("\\") + 1: len(songs)].replace(".mp3", ""))
    return f.render_template("index.html", song=songs[-2][songs[-2].rindex("\\") + 1: len(songs[-2])].replace(".mp3", "").replace(" ", "#SPACE#"), current_song_id=current_song_id - 1, volume=volume)

if __name__ == "__main__":
    app.run(debug=True)