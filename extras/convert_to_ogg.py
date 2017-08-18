import os, os.path
import codecs
from bs4 import BeautifulSoup
import subprocess

curr_dir = os.path.dirname(os.path.abspath(__file__))

print curr_dir

output_dir = curr_dir+'/ogg/'
ffmpeg_path = '/Users/avrosh/Downloads/Lion_Mountain_Lion_Mavericks_Yosemite_El-Captain_15.05.2017/ffmpeg'

# -i inp.wav -c:a libvorbis -qscale:a 5 out.ogg


files = [wavs for wavs in os.listdir(curr_dir) if 'wav' in wavs]
print files

for wav in files:
	output_file = wav.split(".")[0]
	subprocess.call([ffmpeg_path,'-i', curr_dir+'/'+wav, '-c:a', 'libvorbis', '-qscale:a', '5', output_dir+output_file+'.ogg'])
	print output_dir+output_file+'.ogg'
	print curr_dir+'/'+wav

