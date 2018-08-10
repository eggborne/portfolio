var currentSection = "projects"
var minimumColumnWidth = 350
var maximumColumnWidth = 480
var maxColumns = 6
var columnAmount
var sections = {
  projects : {
    html : '', // filled with determineColumnAmount()
    title : 'Projects'
  },
  about : {
    html : '<div class="container about"><p> <div class="page-header"><h1>Education</h1></div> Nullam bibendum mi dapibus, pretium mauris non, porttitor nisl. Quisque mollis tempus semper. Etiam convallis vehicula neque, sit amet mollis nibh posuere vel. Aenean viverra arcu id congue dignissim. Mauris diam lorem, condimentum vel diam quis, dapibus sollicitudin ligula. Fusce sed luctus ante. Sed sit amet eros tempor, sollicitudin erat id, luctus leo. Curabitur eget aliquet dui, et sollicitudin turpis. Aenean eget molestie risus, eu pulvinar lorem. Aliquam sed velit dolor. Curabitur vel elit felis. Nam viverra dui nisi, quis dictum massa euismod ac. Proin sit amet tempus elit. Donec sit amet arcu ornare, vehicula quam id, condimentum nisi. Donec fringilla quis lorem in condimentum. </p> <p> <div class="page-header"><h1>Skills</h1></div> In vulputate pretium risus, in pharetra libero tempor et. Fusce posuere orci quis dolor sodales interdum. Sed ultricies sodales purus, at consequat tellus tristique non. Integer id arcu ut nisi egestas interdum a sed neque. Nam ut leo ut odio porta finibus id nec dui. Suspendisse potenti. Mauris eros urna, ullamcorper a luctus interdum, varius quis tortor. Praesent imperdiet, enim at egestas vulputate, lectus sem varius quam, vitae dapibus mauris leo non lacus. </p> <p> <div class="page-header"><h1>Hobbies</h1></div> Morbi at commodo risus. Quisque ornare vel velit sed euismod. Fusce pharetra commodo urna, tincidunt mattis odio elementum vel. Proin eget facilisis magna. Vestibulum et dui quis sem auctor malesuada. Sed nec est viverra, placerat arcu et, lobortis lectus. Quisque ac metus semper, dapibus lorem nec, fermentum augue. Nullam fringilla pellentesque lacus in tempor. Suspendisse gravida fringilla nulla ac venenatis. Nulla elementum feugiat sollicitudin. </p></div>',
    title : 'About Me'
  },
  contact : {
    html : '<div class="container contact"><div class="page-header"><h2>Contact Mike</h2></div> <div class="row"> <div class="col-md-4 contact-grid"> <h3>Phone:</h3> <h4><strong>360-936-8442</strong></h4> </div> <div class="col-md-4 contact-grid"> <h3>Email:</h3> <h4><a href="mailto:mike@eggborne.com"><strong>mike@eggborne.com</strong></a></h4> </div> <div class="col-md-4 contact-grid"> <h3>GitHub:</h3> <h4><a href="https://www.github.com/eggborne"><strong>github.com/eggborne</strong></a></h4> </div> </div>',
    title : 'Contact'
  }
}
var projectList = shuffle(Object.keys(projectData))
$(window).resize(function(){
  // check if column width is out of bounds
  if ($('#column0').width() < minimumColumnWidth || $('#column0').width() > maximumColumnWidth ) {
    // overwrite new grid HTML to sections.projects.html
    determineColumnAmount()
    // fill #projects div with grid HTML
    document.getElementById("projects").innerHTML = sections.projects.html
    // fill #projects with project cards
    fillProjectCards(false)
  }
})
function determineColumnAmount() { // *must split into separate determine/create functions
  var stageWidth = document.getElementById("stage").getBoundingClientRect().width
  if (minimumColumnWidth > stageWidth) {
    minimumColumnWidth = stageWidth
  }
  // check how many columns could fit
  columnAmount = Math.floor(stageWidth/minimumColumnWidth)
  // make sure it's divisible by 12
  columnAmount > 6 ? columnAmount = 6 : null
  if (12 % columnAmount) {
    if (columnAmount===5) {
      columnAmount = 4
    }
  }
  sections.projects.html = '<div class="row">'
  for (var c=0;c<columnAmount;c++) {
    sections.projects.html += '<div id="column'+c+'" class="col-xs-'+(12/columnAmount)+' project-column"></div>'
  }
  sections.projects.html += '</div>'
}
function fillSections() { // only called ONCE on body.onload
  document.getElementById("projects").innerHTML = sections.projects.html
  document.getElementById("about").innerHTML = sections.about.html
  document.getElementById("contact").innerHTML = sections.contact.html
  // projects section is toggled visible in body.onload AFTER cards are filled
}
function fillProjectCards() { // called on load AND on resize
  var cardsPerColumn = Math.floor(projectList.length/columnAmount)
  var targetColumnIndex = 0
  for (var p=0;p<projectList.length;p++) {
    var currentProjectData = projectData[projectList[p]]
    // add numbered placeholders
    // *for testing carousel
    if (currentProjectData.screenshots.length < 3) {
      var needed = 3-currentProjectData.screenshots.length
      for (var n=currentProjectData.screenshots.length;n<needed;n++) {
        currentProjectData.screenshots.push("img/placeholder"+n+".png")
      }
    }
    // *
    var screenshotPath = currentProjectData.screenshots[0]
    var displayName = currentProjectData.displayName
    var targetColumnID = "column"+targetColumnIndex
    var projectID = "project"+p
    var repoURL = "https://www.github.com/eggborne/"+currentProjectData.repo
    var targetDiv = document.getElementById(targetColumnID)
    // lighten themeColor for panel body
    var bodyColor = hexToRgbA(currentProjectData.themeColor).replace("1)","0.5)")
    var galleryContents = '<img class="screenshot" src="'+screenshotPath+'" alt="'+displayName+' screenshot">'
    targetDiv.innerHTML += '<div id="'+projectID+'" class="project-card panel"><div class="panel-heading" style="background-color:'+currentProjectData.themeColor+'"><h2 class="panel-title"><a href="'+currentProjectData.url+'">'+displayName+'</a></h2></div><div class="panel-body" style="background-color:'+bodyColor+'"><div id="gallery+'+p+'">'+galleryContents+'</div><div style="margin: 20px 0 15px 0" class="page-header"><h4>Description:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandOnClick(`project-description-`,`'+p+'`)" id="desc-button-'+p+'">Expand</button></div><p><ul class="collapsed" id="project-description-'+p+'"></ul></p><br><div style="margin: 20px 0 15px 0" class="page-header"><h4>Technologies used:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandOnClick(`tech-list-`,`'+p+'`)" id="tech-button-'+p+'">Expand</button></div><ul class="collapsed" id="tech-list-'+p+'"></ul></div><div class="panel-footer"><div class="row"><div class="col-sm-6"><a style="color:white" href="'+currentProjectData.url+'"><img class="left-icon"src="img/websiteicon.png">Website</a></div><div class="col-sm-6"><span style="float:right"><a style="color:white" href="'+repoURL+'">Github<img class="right-icon"src="img/githubicon.png"></a></span></div></div></div></div>'
    // fill descriptions
    var descriptionList = document.getElementById("project-description-"+p)
    for (var d=0;d<currentProjectData.descriptionBullets.length;d++) {
      var currentBullet = currentProjectData.descriptionBullets[d]
      if (currentBullet.length) {
        descriptionList.innerHTML += '<li>'+currentBullet+'</span></li>' // why the </span>?
      }
    }
    // fill tech lists
    var techList = document.getElementById("tech-list-"+p)
    for (var t=0;t<currentProjectData.techBullets.length;t++) {
      var currentTechBullet = currentProjectData.techBullets[t]
      techList.innerHTML += '<li class="tech-bullet"><span class="label label-success">'+currentTechBullet+'</span></li>'
    }
    // move to next column every cardsPerColumn-th project
    if ((p+1)%cardsPerColumn===0) { // *count from 1 to avoid moving when p = 0
      targetColumnIndex++
    }
  }
}
function toggleBarButton(button) {
  button.classList.add('selected')
  var barButtonArray = document.getElementsByClassName("bar-button")
  for (var b=0;b<barButtonArray.length;b++) {
    var currentButton = barButtonArray[b]
    if (currentButton !== button) {
      currentButton.classList.remove('selected')
    }
  }
}
function expandOnClick(sectionID,index) {
  var section = document.getElementById(sectionID+index)
  if (sectionID[0]==="p") {
    var button = document.getElementById("desc-button-"+index)
  } else {
    var button = document.getElementById("tech-button-"+index)
  }
  if (section.classList.contains("collapsed")) {
    section.classList.remove("collapsed")
    button.innerHTML = "Collapse"
  } else {
    section.classList.add("collapsed")
    button.innerHTML = "Expand"
  }
}
function toggleSectionVisible(newSection) {
  $('#'+newSection).fadeIn(300)
  if (newSection !== currentSection) {
    $('#'+currentSection).fadeOut(100)
    if (currentSection !== newSection) {
      document.title = "Michael Donovan | " + sections[newSection].title
      currentSection = newSection
    }
  }
}
function shuffle(arr) {
  // make a large array filled with zeroes
  var randomPool = new Array(100).fill(0,0,100) // larger = more random?
  var filledIndexes = []
  var shuffledArray = []
  // replace random zeroes with original array members
  arr.forEach(function(projectKey) {
    var randomIndex = randomInt(0,randomPool.length-1)
    // get another randomIndex if pool already contains a nonzero there
    // *or splice it in and remove an arbitrary zero?
    while (randomPool[randomIndex]) {
      randomIndex = randomInt(0,99)
    }
    randomPool[randomIndex] = projectKey
    filledIndexes.push(randomIndex)
  });
  // put nonzeroes from array into shuffledArray
  randomPool.forEach(function(entry){
    entry ? shuffledArray.push(entry) : null
  })
  return shuffledArray
}
function log(message,lineBreak) {
  if (lineBreak) {
    document.getElementById("debug").innerHTML += "<p>"+message
  } else {
    document.getElementById("debug").innerHTML += "<br>"+message
  }
  console.log(message)
}
// swiped these from Stack Overflow
function randomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function hexToRgbA(hex){
  var c
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
    if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c= '0x'+c.join('')
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)'
  }
}