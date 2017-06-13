import os, os.path
import codecs
from bs4 import BeautifulSoup
import subprocess

# curr_dir = os.path.dirname(os.path.abspath(__file__))

curr_dir = '/Users/avrosh/Documents/avroshk.github.io/media/audio'
print curr_dir

input_dir = curr_dir+'/ogg/'
output_dir = curr_dir+'/m4a/'
ffmpeg_path = '/Users/avrosh/Downloads/Lion_Mountain_Lion_Mavericks_Yosemite_El-Captain_15.05.2017/ffmpeg'


files = [wavs for wavs in os.listdir(input_dir) if 'ogg' in wavs]
print files

for wav in files:
	output_file = wav.split(".")[0]
	subprocess.call([ffmpeg_path,'-i', input_dir+wav, '-codec:a', 'aac', output_dir+output_file+'.m4a'])
	print output_dir+output_file+'.m4a'
	print input_dir+wav


	
