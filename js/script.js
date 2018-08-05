var currentSection = "projects" // must change to sections.projects once sections obj is made
var minimumColumnWidth = 350
var maxColumns = 6
var columnAmount
var sectionBodies = { // include this in sections obj as sections.html
  projects : '<div class="row">', // the rest is filled with determineColumnAmout()
  about : '<div class="container about"><p> <div class="page-header"><h1>Education</h1></div> Nullam bibendum mi dapibus, pretium mauris non, porttitor nisl. Quisque mollis tempus semper. Etiam convallis vehicula neque, sit amet mollis nibh posuere vel. Aenean viverra arcu id congue dignissim. Mauris diam lorem, condimentum vel diam quis, dapibus sollicitudin ligula. Fusce sed luctus ante. Sed sit amet eros tempor, sollicitudin erat id, luctus leo. Curabitur eget aliquet dui, et sollicitudin turpis. Aenean eget molestie risus, eu pulvinar lorem. Aliquam sed velit dolor. Curabitur vel elit felis. Nam viverra dui nisi, quis dictum massa euismod ac. Proin sit amet tempus elit. Donec sit amet arcu ornare, vehicula quam id, condimentum nisi. Donec fringilla quis lorem in condimentum. </p> <p> <div class="page-header"><h1>Skills</h1></div> In vulputate pretium risus, in pharetra libero tempor et. Fusce posuere orci quis dolor sodales interdum. Sed ultricies sodales purus, at consequat tellus tristique non. Integer id arcu ut nisi egestas interdum a sed neque. Nam ut leo ut odio porta finibus id nec dui. Suspendisse potenti. Mauris eros urna, ullamcorper a luctus interdum, varius quis tortor. Praesent imperdiet, enim at egestas vulputate, lectus sem varius quam, vitae dapibus mauris leo non lacus. </p> <p> <div class="page-header"><h1>Hobbies</h1></div> Morbi at commodo risus. Quisque ornare vel velit sed euismod. Fusce pharetra commodo urna, tincidunt mattis odio elementum vel. Proin eget facilisis magna. Vestibulum et dui quis sem auctor malesuada. Sed nec est viverra, placerat arcu et, lobortis lectus. Quisque ac metus semper, dapibus lorem nec, fermentum augue. Nullam fringilla pellentesque lacus in tempor. Suspendisse gravida fringilla nulla ac venenatis. Nulla elementum feugiat sollicitudin. </p></div>',
  contact : '<div class="container contact"><div class="page-header"><h1>Contact Mike</h1></div> <div class="row"> <div class="col-lg-4 contact-grid"> <h2>Phone:</h2> <h3><strong>360-936-8442</strong></h3> </div> <div class="col-lg-4 contact-grid"> <h2>Email:</h2> <h3><a href="mailto:mike@eggborne.com"><strong>mike@eggborne.com</strong></a></h3> </div> <div class="col-lg-4 contact-grid"> <h2>GitHub:</h2> <h3><a href="https://www.github.com/eggborne"><strong>github.com/eggborne</strong></a></h3> </div> </div>'
}


function determineColumnAmount() {
  var stageWidth = document.getElementById("stage").getBoundingClientRect().width
  log("minimumColumnWidth: " + minimumColumnWidth)
  log("maxColumns: " + maxColumns)
  log("stage width: " + stageWidth)
  log("full width: " + window.innerWidth,true)
  if (minimumColumnWidth>stageWidth) {
    minimumColumnWidth = stageWidth
    log("had to reduce column width to " + minimumColumnWidth)
  }
  columnAmount = Math.floor(stageWidth/minimumColumnWidth)
  // make sure it's divisible by 12
  columnAmount > 6 ? columnAmount = 6 : false
  if (12 % columnAmount) {
    if (columnAmount===5) {
      columnAmount = 4
    }
  }  
  log("room for " + columnAmount + " columns")
  log("each should be col-" + (12/columnAmount),true)
  for (var c=0;c<columnAmount;c++) {
    sectionBodies.projects += '<div id="column'+c+'" class="col-xs-'+(12/columnAmount)+'"></div>'
  }
  sectionBodies.projects += '</div>'
}
function setButtonBarMode() {
  if (window.innerWidth <= 400) {
    document.getElementById("button-bar").className = "btn-group-vertical"
  }
}
function fillSections() { // only called ONCE on body.onload
  document.getElementById("projects").innerHTML = sectionBodies["projects"]
  document.getElementById("about").innerHTML = sectionBodies["about"]
  document.getElementById("contact").innerHTML = sectionBodies["contact"]
  // projects section is toggled visible in body.onload after cards are filled
}
function fillProjectCards() {
  var projectList = Object.keys(projectData)
  var cardsPerColumn = Math.floor(projectList.length/columnAmount) // move to next every nth project
  var targetColumnIndex = 0
  for (var p=0;p<projectList.length;p++) {
    var currentProjectData = projectData[projectList[p]]
    var screenshotPath = currentProjectData.screenshots[0].length > 2 ? currentProjectData.screenshots[0] : "img/placeholder.png"
    var displayName = currentProjectData.displayName
    var targetColumnID = "column"+targetColumnIndex
    console.log("putting " + currentProjectData.displayName + ", p " + p + ", into " + targetColumnID)
    var projectID = "project"+p
    var repoURL = "https://www.github.com/eggborne/"+currentProjectData.repo
    var targetDiv = document.getElementById(targetColumnID)
    // lighten themeColor for panel body
    var bodyColor = hexToRgbA(currentProjectData.themeColor).replace("1)","0.4)")
    
    targetDiv.innerHTML += '<div id="'+projectID+'" class="project-card panel"><div class="panel-heading" style="background-color:'+currentProjectData.themeColor+'"><h2 class="panel-title"><a href="'+currentProjectData.url+'">'+displayName+'</a></h2></div><div class="panel-body" style="background-color:'+bodyColor+'"><img class="thumbnail screenshot" src="'+screenshotPath+'" alt="'+displayName+' screenshot"><div style="margin: 20px 0 15px 0" class="page-header"><h4>Description:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandOnClick(`project-description-`,`'+p+'`)" id="desc-button-'+p+'">Expand</button></div><p><ul class="collapsed" id="project-description-'+p+'"></ul></p><br><div style="margin: 20px 0 15px 0" class="page-header"><h4>Technologies used:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandOnClick(`tech-list-`,`'+p+'`)" id="tech-button-'+p+'">Expand</button></div><ul class="collapsed" id="tech-list-'+p+'"></ul></div><div class="panel-footer" style="background-color:#ccc"><div class="row"><div class="col-sm-6"><a href="'+currentProjectData.url+'"><img class="left-icon"src="img/websiteicon.png">Website</a></div><div class="col-sm-6"><span style="float:right"><a href="'+repoURL+'">Github<img class="right-icon"src="img/githubicon.png"></a></span></div></div></div></div>'
    // reduce title font size if too long

    // fill descriptions
    var descriptionList = document.getElementById("project-description-"+p)
    for (var d=0;d<currentProjectData.descriptionBullets.length;d++) {
      var currentBullet = currentProjectData.descriptionBullets[d]
      if (currentBullet.length) {
        descriptionList.innerHTML += '<li>'+currentBullet+'</span></li>'
      }
    }
    // fill tech lists
    var techList = document.getElementById("tech-list-"+p)
    for (var t=0;t<currentProjectData.techBullets.length;t++) {
      var currentTechBullet = currentProjectData.techBullets[t]
      techList.innerHTML += '<li class="tech-bullet"><span class="label label-success">'+currentTechBullet+'</span></li>'
    }
    // move to next column if appropriate
    if ((p+1)%cardsPerColumn===0) {
      targetColumnIndex++
    }
  }
  log("added " + projectList.length + " projects")
}
function toggleBarButton(button) {
  button.classList.remove('btn-default')
  button.classList.add('btn-success')
  var barButtonArray = document.getElementsByClassName("bar-button")
  for (var b=0;b<barButtonArray.length;b++) {
    var currentButton = barButtonArray[b]
    if (currentButton !== button) {
      currentButton.classList.remove('btn-success')
      currentButton.classList.add('btn-default')
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
  // newSection now is an ID but will be an object in future (i.e. newSection.id)
  var oldSectionDiv = document.getElementById(currentSection)
  var newSectionDiv = document.getElementById(newSection)

  // obscure the currently visible section
  if (newSection!==currentSection) {
    console.log("toggling " + currentSection + " invisible")
    oldSectionDiv.style.opacity = 0

    // must display:none so that it stops taking up space
    setTimeout(function(){ // delayed in order to show fancy transition
      oldSectionDiv.style.display = "none"
    },200)
  }
  // show the new selected section
  console.log("toggling " + newSection + " visible")
  newSectionDiv.style.display = "block"
  newSectionDiv.style.opacity = 1
  currentSection = newSection // very important
}
function log(message,lineBreak) {
  if (lineBreak) {
    document.getElementById("debug").innerHTML += "<p>"+message
  } else {
    document.getElementById("debug").innerHTML += "<br>"+message
  }
}
function clearLog() {
  document.getElementById("debug").innerHTML = ""
}

// swiped this from Stack Overflow
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