var projectData =
{
  'frogracer':{
        bgColor:'#002508',
        url:'/frogracer/',
        iconUrl:'/icons/frogracericon.png',
        shortName:'frogracer',
        displayName:'Frog Racer 2018',
        descriptionBullets:[
            'Endless randomized Battletoads Turbo Tunnel level',
            'Split-screen mobile touch control interface',
        ],
        screenshots:['/img/frtitle.png']
    },
    'tetro':{
        bgColor:'#150018',
        url:'/tetro/',
        iconUrl:'/icons/tetrisicon.bmp',
        shortName:'tetro',
        displayName:'Tetro',
        descriptionBullets:[
            'Mobile-optimized recreation of the original NES Tetris with new features and game modes',
        ],
        screenshots:['/img/tetrotitle.png']
    },
    'metroid':{
        bgColor:'#00004d',
        url:'/metroid/',
        shortName:'metroid',
        iconUrl:'/icons/metroidicon.png',
        displayName:'Random Metroid',
        descriptionBullets:[
            'Procedurally generated NES Metroid',
            'Dynamic multi-level loading system ensures optimum framerate regardless of map size'
        ],
        screenshots:['/img/metroidtitle.png']
    },
    'kungfu':{
        bgColor:'#00004d',
        url:'/kungfu/',
        shortName:'kungfu',
        iconUrl:'/icons/kficon.png',
        displayName:'NES Kung Fu',
        descriptionBullets:[
            'Procedurally generated NES Metroid',
            'Dynamic multi-level loading system ensures optimum framerate regardless of map size'
        ],
        screenshots:['/img/metroidtitle.png']
    },
    'punchout':{
        bgColor:'#804000',
        url:'/mtpo/',
        shortName:'punchout',
        iconUrl:'/icons/boxinggloveicon.png',
        displayName:'Donald Trumps\'s Punch-Out!',
        descriptionBullets:[
            'Mike Tyson\'s Punch-Out except you beat up Trump',
            // '',
            'Only makes you feel better temporarily'
        ],
        screenshots:['/img/punchouttitle.png']
    },
    'toad':{
        bgColor:'#002508',
        url:'/toad/',
        iconUrl:'/icons/toadicon.png',
        shortName:'toad',
        displayName:'Toad\'s Odyssey',
        descriptionBullets:[
            '',
        ],
        screenshots:['']
    },
    'cas':{
        bgColor:'#222211',
        url:'/cas/',
        iconUrl:'/icons/casicon.png',
        shortName:'cas',
        displayName:'Cellular Automata Sandbox',
        descriptionBullets:[
            "Creates cool 3D designs using procedural generation",
            "Highly customizable in appearance and logic"
        ],
        screenshots:['/img/castitle.png']
    },
    'eggprotector':{
        bgColor:'#1a0000',
        url:'/eggprotector/',
        iconUrl:'/icons/fetusicon.png',
        shortName:'eggprotector',
        displayName:'Egg Protector',
        descriptionBullets:[
            'Missile Command/tower defense mashup with a biological twist'
        ],
        screenshots:['/img/kctitle.png']
    },
    'spermtyper':{
        bgColor:'#002b2b',
        iconUrl:'/icons/spermtypericon.png',
        url:'/spermtyper/',
        shortName:'spermtyper',
        displayName:'Sperm Typer',
        descriptionBullets:[
            'Fast-paced typing game',
            'Requires landscape mode and physical keyboard'
        ],
        screenshots:['/img/sttitle.png']
    },
    'yarsrevenge':{
        bgColor:'#252525',
        url:'/yars/',
        iconUrl:'/icons/yarsicon.png',
        shortName:'yarsrevenge',
        displayName:'Yars\' Revenge',
        descriptionBullets:[
            'Yars\' Revenge'
        ],
        screenshots:['/img/yarstitle.png']
    },
    'clues':{
        bgColor:'#252525',
        url:'/clues/',
        iconUrl:'/icons/crosswordicon.png',
        shortName:'clues',
        displayName:'Crossword Clue Creator',
        descriptionBullets:[

        ],
        screenshots:[]
    }
    ,
    'pong':{
        bgColor:'#252525',
        url:'/pong/',
        iconUrl:'/icons/pongicon.png',
        shortName:'pong',
        displayName:'SQL Pong',
        descriptionBullets:[

        ],
        screenshots:[]
    },
    'cursorsforcats':{
        bgColor:'#252525',
        url:'http://www.cursorsforcats.com/',
        iconUrl:'/icons/cfcicon.png',
        shortName:'cursorsforcats',
        displayName:'Cursors for Cats',
        descriptionBullets:[

        ],
        screenshots:[]
    }
}


function fillProjectCards() {
  var projectList = Object.keys(projectData)
  console.log(projectList)
  for (var p=0;p<projectList.length;p++) {
    var currentProjectData = projectData[projectList[p]]
    console.log("current project is " + currentProjectData.shortName)
    var targetDivID = (p%2===0) ? "column1" : "column2"
    var projectID = "project"+p
    console.log("putting in column " + targetDivID + " with ID " + projectID)
    var targetDiv = document.getElementById(targetDivID)
    targetDiv.innerHTML += '<div id="'+projectID+'" class="post panel panel-success"><div class="panel-heading"><h2 class="panel-title"><a href="#">Project Title</a></h2></div><div class="panel-body"><img class="screenshot" src="img/placeholder.bmp" alt="Project screenshot"><div style="margin: 20px 0 15px 0" class="page-header"><h4>Description:</h4></div><p class="project-description">Description body. Monkeys like bananas. Sometimes dogs are brown. I would like a chicken as a pet.</p><br><div style="margin: 20px 0 15px 0" class="page-header"><h4>Technologies used:</h4></div><ul class="tech-list"></ul></div></div>'
    console.log(targetDiv)
  }
}
