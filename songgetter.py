import os 
import random
import glob
import shutil

from random import randint
from flask import Flask
from flask import request, render_template


# ---- Constants ----
MUSIC_TARGET_PATH = "static/songs"
MUSIC_USER_LOCATION = os.environ["USERPROFILE"] + "/Music"


# ---- Utitlity Functions ----
def get_all_songs(path):
    all_music_files = []
    for (dirpath, _, filenames) in os.walk(path):
        for filename in filenames:
            if filename.split(".")[-1] != "mp3":
                continue
            all_music_files.append(os.path.join(dirpath, filename))

    return all_music_files

# ---- Flask ----
app = Flask(__name__)
files_database = get_all_songs(MUSIC_USER_LOCATION)
playlist = []
current_song_id = -1

def copy_song(songs):
        global current_song_id 
        current_song_id +=1
        songs.append(files_database[randint(0, len(files_database) - 1)])
        shutil.copy(src=songs[-1], dst=f"{MUSIC_TARGET_PATH}/song{str(current_song_id)}.mp3")

@app.route("/", methods=["GET"])
def homepage(): 
    global current_song_id, music_database
    
    volume = request.args.get("volume")
    if volume == None:
        volume = 5
    
    if request.args.get("back") == "true":
        if current_song_id - 1 > 0:
            current_song_id -= 1
    else:
        print(current_song_id)
        copy_song(playlist)
        print(current_song_id)
    
    return render_template("index.html", 
            song=playlist[current_song_id - 1][playlist[current_song_id - 1].rindex("\\") + 1: \
                 len(playlist[current_song_id - 1])].replace(".mp3", "").replace(" ", "#SPACE#"), 
            current_song_id=current_song_id - 1, 
            volume=volume)



# song_copy_path: Final[str] = "C:\\Zeyrux\\Websites\\MusicPlayer\\static\\songs\\"
# files: list[str] = glob.glob("C:\\Users\\tappe\\Music\\*\\*.mp3")
# songs: list[str] = []
# current_song_id = -1

# def copy_file():
#     global songs, current_song_id
#     current_song_id += 1
#     songs.append(files[random.randint(0, len(files) - 1)])
#     shutil.copy(src=songs[-1], dst=f"{song_copy_path}song{str(current_song_id)}.mp3")

# app = f.Flask(__name__)

# copy_file()

# @app.route("/", methods=["GET"])
# def index():
#     global current_song_id
#     volume = f.request.args.get("volume")
#     if volume == None:
#         volume = 5
#     if f.request.args.get("back") == "true":
#         if current_song_id - 1 > 0:
#             current_song_id -= 1
#     else:
#         copy_file()
#     print(songs[-1][songs[-1].rindex("\\") + 1: len(songs)].replace(".mp3", ""))
#     return f.render_template("index.html", song=songs[current_song_id-1][songs[current_song_id-1].rindex("\\") + 1: len(songs[current_song_id-1])].replace(".mp3", "").replace(" ", "#SPACE#"), current_song_id=current_song_id - 1, volume=volume)

if __name__ == "__main__":
    copy_song(playlist)
    app.run(debug=True)