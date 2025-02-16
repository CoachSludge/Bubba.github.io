PORTING FROM guns.lol
*copy page source if its easier for you or copy from one of the existing htmls here
if you copy from the htmls you gota change alot of shit and route the pictures audio video ect, not to mention bio and links
id suggest getting ahold of coach who pays for guns.lol premium to do this without having to route anything

DO THIS FIRST OR NOTHING WILL WORK
change /_next/ to https://guns.lol/_next/


REMOVE twitter/web og image and change the shit, again a total of 2 or 3 of these things
also update the guns.lol title to bubba.industries
original
   <title>@coachsludge | guns.lol</title>
      <meta name="description" content="hyper lethal - pro gambler/trader/musician/gamer"/>
      <meta name="author" content="@coachsludge | guns.lol"/>
      <meta property="og:title" content="@coachsludge | guns.lol"/>
      <meta property="og:description" content="hyper lethal - pro gambler/trader/musician/gamer"/>
      <meta property="og:image" content="https://og.guns.lol/api/og?username=coachsludge&amp;t=1739717893522"/>
      <meta property="og:type" content="website"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="@coachsludge | guns.lol"/>
      <meta name="twitter:description" content="hyper lethal - pro gambler/trader/musician/gamer"/>
      <meta name="twitter:image" content="https://og.guns.lol/api/og?username=coachsludge&amp;t=1739717893522"/>
new
<title>@coachsludge | bubba.industries</title>
      <meta name="description" content="hyper lethal - pro gambler/trader/musician/gamer"/>
      <meta name="author" content="@coachsludge | bubba.industries"/>
      <meta property="og:title" content="@coachsludge | bubba.industries"/>
      <meta property="og:description" content="hyper lethal - pro gambler/trader/musician/gamer"/>
      <meta property="og:type" content="website"/>
      <meta name="twitter:title" content="@coachsludge | bubba.industries"/>
      <meta name="twitter:description" content="hyper lethal - pro gambler/trader/musician/gamer"/>


REMOVE discord pfp shit unless you got it
original
  <link rel="preload" as="image" href="https://cdn.discordapp.com/avatar-decoration-presets/a_10b9f886b513b77ccdd67c8784f1a496.png"/>
  new
    <link rel="preload" as="image" href=""/>
  *total of 2 or 3

UPDATE FAVICONS
you can just paste this over the guns.lol favicons
or just find and replace all https://bubba.industries/assets/images/favicon/
      <link rel="apple-touch-icon" sizes="180x180" href="https://bubba.industries/assets/images/favicon/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="https://bubba.industries/assets/images/favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="https://bubba.industries/assets/images/favicon/favicon-16x16.png"/>
      <link rel="manifest" href="https://bubba.industries/assets/images/favicon/site.webmanifest"/>
      



simple shit if your a pro

/_next/ to https://guns.lol/_next/

https://assets.guns.lol/favicon/ to https://bubba.industries/assets/images/favicon/

<title>@coachsludge | guns.lol</title> to <title>@coachsludge | bubba.industries</title>

remove       <meta name="twitter:image" content="https://og.guns.lol/api/og?username=coachsludge&amp;t=1739717893522"/>
remove       <meta property="og:image" content="https://og.guns.lol/api/og?username=coachsludge&amp;t=1739717893522"/>
