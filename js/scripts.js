var currentSection = "projects"
var minimumColumnWidth = 350, maximumColumnWidth = 480
var maxColumns = 6, columnAmount
var projectList = shuffle(Object.keys(projectData))
var sections = {
  projects : {
    html : '', // filled with conceiveProjectGrid()
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
$(window).resize(function(){
  if ($('#column0').width() < minimumColumnWidth || $('#column0').width() > maximumColumnWidth ) {
		setColumnAmount()
		conceiveProjectGrid()
    document.getElementById("projects").innerHTML = sections.projects.html
    createProjectCards()
  }
})
function setColumnAmount() {
	var stageWidth = document.getElementById("stage").getBoundingClientRect().width
  minimumColumnWidth > stageWidth ? minimumColumnWidth = stageWidth : false
  // determine how many columns could fit
  columnAmount = Math.floor(stageWidth/minimumColumnWidth)
  // make sure it's divisible by 12
  columnAmount > 6 ? columnAmount = 6 : false
	12 % columnAmount ? columnAmount===5 ? columnAmount = 4 : false : false
}
function conceiveProjectGrid() {
	sections.projects.html = '<div class="row">'
  for (var c=0;c<columnAmount;c++) {
    sections.projects.html += '<div id="column'+c+'" class="col-xs-'+(12/columnAmount)+' project-column"></div>'
  }
  sections.projects.html += '</div>'
}
function fillSectionIndexes() { // only called ONCE on body.onload
  document.getElementById("projects").innerHTML = sections.projects.html
  document.getElementById("about").innerHTML = sections.about.html
  document.getElementById("contact").innerHTML = sections.contact.html
  // projects section is toggled visible in body.onload AFTER cards are filled
}
function createProjectCards() { // called on load AND on resize
  var cardsPerColumn = Math.floor(projectList.length/columnAmount)
	var targetColumnIndex = 0
	projectList.forEach(function(projectKey){
		var project = projectData[projectKey], p = projectList.indexOf(projectKey)
		// add numbered placeholders
    // *for testing carousel
    if (project.screenshots.length < 3) {
      var needed = 3-project.screenshots.length
      for (var n=project.screenshots.length;n<needed;n++) {
        project.screenshots.push("img/placeholder"+n+".png")
      }
    }
    var screenshotPath = project.screenshots[0]
    var displayName = project.displayName
    var targetColumnID = "column"+targetColumnIndex
    var projectID = "project"+p
    var repoURL = "https://www.github.com/eggborne/"+project.repo
    var targetDiv = document.getElementById(targetColumnID)
    // lighten themeColor for panel body
    var bodyColor = hexToRgbA(project.themeColor).replace("1)","0.5)")
    var galleryContents = '<img class="screenshot" src="'+screenshotPath+'" alt="'+displayName+' screenshot">'
    targetDiv.innerHTML += '<div id="'+projectID+'" class="project-card panel"><div class="panel-heading" style="background-color:'+project.themeColor+'"><h2 class="panel-title"><a href="'+project.url+'">'+displayName+'</a></h2></div><div class="panel-body" style="background-color:'+bodyColor+'"><div id="gallery+'+p+'">'+galleryContents+'</div><div style="margin: 20px 0 15px 0" class="page-header"><h4>Description:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandInfoArea(`project-description-`,`'+p+'`)" id="desc-button-'+p+'">Expand</button></div><p><ul class="collapsed" id="project-description-'+p+'"></ul></p><br><div style="margin: 20px 0 15px 0" class="page-header"><h4>Technologies used:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandInfoArea(`tech-list-`,`'+p+'`)" id="tech-button-'+p+'">Expand</button></div><ul class="collapsed" id="tech-list-'+p+'"></ul></div><div class="panel-footer"><div class="row"><div class="col-sm-6"><a style="color:white" href="'+project.url+'"><img class="left-icon"src="img/websiteicon.png">Website</a></div><div class="col-sm-6"><span style="float:right"><a style="color:white" href="'+repoURL+'">Github<img class="right-icon"src="img/githubicon.png"></a></span></div></div></div></div>'
    // fill descriptions
		var descriptionList = document.getElementById("project-description-"+p)
		project.descriptionBullets.forEach(function(bullet){
			bullet.length ? descriptionList.innerHTML += '<li>'+bullet+'</span></li>' : false;
		})
    // fill tech lists
		var techList = document.getElementById("tech-list-"+p)
		for (var t=0;t<project.techBullets.length;t++) {
			var techBullet = project.techBullets.length
			techList.innerHTML += '<li class="tech-bullet"><span class="label label-success">'+techBullet+'</span></li>'
		}
    // move to next column every cardsPerColumn-th project
		((p+1) % cardsPerColumn) === 0 ? targetColumnIndex++ : false; // *count from 1 to avoid moving when p = 0
	})
	for (var projectKey in projectData) {
		
	}
}
function toggleSectionVisible(newSection) {
  $('#'+newSection).fadeIn(300)
  if (newSection !== currentSection) {
    $('#'+currentSection).fadeOut(100)
    document.title = "Michael Donovan | " + sections[newSection].title
    currentSection = newSection
  }
}
function toggleBarButton(button) {
  button.classList.add('selected')
  var barButtonArray = Array.from(document.getElementsByClassName("bar-button"))
  barButtonArray.forEach(function(barButton){
		barButton !== button ? barButton.classList.remove('selected') : false
	})
}
function expandInfoArea(sectionID,index) {
  var section = document.getElementById(sectionID+index)
  if ($('#'+sectionID).is(':first-child')) {
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
function shuffle(arr) {
  // make a large array filled with zeroes
  var randomPool = new Array(100).fill(0,0,100) // larger = more random?
  var shuffledArray = []
  // replace random zeroes with original array members
  arr.forEach(function(projectKey) {
    var randomIndex = randomInt(0,randomPool.length-1)
    // get another randomIndex if pool already contains a nonzero there
    while (randomPool[randomIndex]) {
      randomIndex = randomInt(0,99)
    }
    randomPool[randomIndex] = projectKey
  });
  // put nonzeroes from array into shuffledArray
  randomPool.forEach(function(entry){
    entry ? shuffledArray.push(entry) : false
  })
  return shuffledArray
}
function log(message,lineBreak) {
	lineBreak ? document.getElementById("debug").innerHTML += "<p>"+message : document.getElementById("debug").innerHTML += "<br>"+message
}
// swiped these from Stack Overflow
function randomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function hexToRgbA(hex){
  var c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    c.length===3 ? c = [c[0], c[0], c[1], c[1], c[2], c[2]] : false;
    c = '0x'+c.join('')
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)'
  }
}