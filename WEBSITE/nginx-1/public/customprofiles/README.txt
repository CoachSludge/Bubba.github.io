Do this first or it wont work (were stealing their JS files, ill locally host them eventually)
/_next/ to https://guns.lol/_next/

change favicon links
example
https://assets.guns.lol/favicon/
to
https://bubba.industries/assets/images/favicon/

remove anything regarding og and twitter image
example 1 
(delete links completly)   <meta property="og:image" content="https://og.guns.lol/api/og?username=coachsludge&amp;t=1739796674701"/>
                           <meta name="twitter:image" content="https://og.guns.lol/api/og?username=coachsludge&amp;t=1739796674701"/>
                           
example 2 locate and delete this link itsself (total of two)
original	  "content\":\"https://og.guns.lol/api/og?username=coachsludge\u0026t=1739798950979\"}
new         "content\":\"\"}


change @user is the name you want Example @frank
      @user | guns.lol to @user | bubba.industries

attempt to locally link audio, video and images, guns.lol's cache deletes after a while
example 
      <div class="nnRYb2_244378cdd5913f278c3a" style="background-image:url(https://r2.guns.lol/0fdc0212-e3fd-4bbd-a46d-ee45993de49f.mp4)"></div>
to
      <div class="nnRYb2_244378cdd5913f278c3a" style="background-image:url(https://bubba.industries/assets/profiles/PROFILE/NAME.mp4)"></div>
      
change audio if had
"url\":\"https://r2.guns.lol/81912a86-d08b-4f66-af35-658bd808bffa.mp3\"
to 
"url\":\"https://bubba.industries/assets/profiles/PROFILE/NAME.mp3\"


NEW UPDATE FOR LOCAL FILES
CHANGE ALL PATHS TO CURRENT

NO LONGER REQUIRED
/_next/ to https://guns.lol/_next/ 

CHANGE AUDIO VIDEO AND IMAGES
(search mp3 mp4 jpg png ect)

CHANGE 
https://assets.guns.lol/_pow.js
TO 
https://bubba.industries/_next/static/main/_pow.js

CHANGE https://sa.guns.lol/latest.js

https://bubba.industries/_next/static/main/latest.js