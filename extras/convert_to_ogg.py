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

# convert pptx files to jpeg
# for unit in units:
# 	print unit
# 	print "---"
# 	lessons = [lesson for lesson in os.listdir(slides_dir+unit) if 'Lesson' in lesson]
# 	for lesson in lessons:
# 		print lesson
# 		print "-----"
# 		ppts = [ppt for ppt in os.listdir(slides_dir+unit+'/'+lesson) if '.pptx' in ppt]
# 		for ppt in ppts:
# 			print ppt
# 			print "------"
# 			src = slides_dir+unit+'/'+lesson+'/'+ppt
# 			dest = slides_output_dir+unit+'/'+lesson
# 			subprocess.call(['java', '-jar', jar_file, src, dest])
# 			print src, dest
# 			print "---------"
			

# for ch in chapters:
# 	data = codecs.open(curr_dir + ch, 'r').read()
# 	soup = BeautifulSoup(data, 'html.parser')

# 	# fix the image file paths
# 	for el in soup.find_all('img', src=lambda x: x.startswith('../media')):
# 		el['src'] = el['src'].replace('../media', 'curriculum/media')

# 	# remove the unwanted inline style chunk
# 	[el.extract() for el in soup('style')]

# 	# replace the divs with "mp3" contents with an audio tag
# 	for el in soup.find_all('div', {'class':'curriculum-mp3'}):
# 		el.contents[0] = soup.new_tag('audio', src=el.string, controls='')

# 	# for highlight.js to work
# 	for el in soup.find_all('code', {'class': lambda x: x and x.startswith('language-')}):
# 		el['class'] = el['class'][0].replace('language-', '')

# 	# add the code-paste button
# 	for el in soup.find_all('pre', {'class':'highlight'}):
# 		lang = el('code')[0]['class']
# 		skip = False
# 		if lang == 'python':
# 			lang_str = 'python'
# 		elif lang == 'javascript': 
# 			lang_str = 'javascript'
# 		else:
# 			skip = True #don't add copy icon

# 		container = soup.new_tag('div')
# 		container['class'] = 'currcode-container'
# 		el.wrap(container)

# 		if not skip:
# 			button = soup.new_tag('button')
# 			button['class'] = 'btn-copy copy-btn-' + lang_str
# 			button['onclick'] = 'doCopy(this)'
# 			button['style'] = 'display:block'

# 			i = soup.new_tag('i')
# 			i['class'] = 'icon icon-paste2'
# 			i['title'] = 'Open the example code in the editor'
	
# 			el.insert_before(i)
# 			i.wrap(button)

	
