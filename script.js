"use strict";

///////////////////////////
///////// GENERAL /////////
///////////////////////////

const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B",];
let numbersScale = [];


////////////////////////////////////////////
///////// HARMONIC FUNCTION FINDER /////////
////////////////////////////////////////////

const harmonicFunction = {
  tonic: "",
  supertonic: "",
  mediant: "",
  subdominant: "",
  dominat: "",
  submediant: "",
  leadingTone: "",
};


document
  .querySelector(".find--harmonic-fnc")
  .addEventListener("click", function () {
    const refNote = document.querySelector(".refnote--harmonic-fnc").value;
    const scale = document.querySelector(".scale--harmonic-fnc").value;
    const refNoteIndex = Number(notes.indexOf(refNote));

    function setMajorHarmonicFunction() {
      harmonicFunction.tonic = notes[numbersScale[0]] + "7M";
      harmonicFunction.supertonic = notes[numbersScale[1]] + "m7";
      harmonicFunction.mediant = notes[numbersScale[2]] + "m7";
      harmonicFunction.subdominant = notes[numbersScale[3]] + "7M";
      harmonicFunction.dominat = notes[numbersScale[4]] + "7";
      harmonicFunction.submediant = notes[numbersScale[5]] + "m7";
      harmonicFunction.leadingTone = notes[numbersScale[6]] + "m7(b5)";
    }

    function setMinorHarmonicFunction() {
      harmonicFunction.tonic = notes[numbersScale[0]] + "m7";
      harmonicFunction.supertonic = notes[numbersScale[1]] + "m7(b5)";
      harmonicFunction.mediant = notes[numbersScale[2]] + "7M";
      harmonicFunction.subdominant = notes[numbersScale[3]] + "m7";
      harmonicFunction.dominat = notes[numbersScale[4]] + "m7";
      harmonicFunction.submediant = notes[numbersScale[5]] + "7M";
      harmonicFunction.leadingTone = notes[numbersScale[6]] + "7";
    }

    if (scale === "Major") {
      numbersScale.push(
        refNoteIndex,
        refNoteIndex + 2,
        refNoteIndex + 4,
        refNoteIndex + 5,
        refNoteIndex + 7,
        refNoteIndex + 9,
        refNoteIndex + 11
      );
      setMajorHarmonicFunction();
      console.log(harmonicFunction);
    } else if (scale === "Minor") {
      numbersScale.push(
        refNoteIndex,
        refNoteIndex + 2,
        refNoteIndex + 3,
        refNoteIndex + 5,
        refNoteIndex + 7,
        refNoteIndex + 8,
        refNoteIndex + 10
      );
      setMinorHarmonicFunction();
      console.log(harmonicFunction);
    }

    document.querySelector(".message--harmonic-fnc").textContent = `The Harmonic Function of ${refNote} ${scale} is:`;

    const fullScale = notes[numbersScale[0]] + " " + notes[numbersScale[1]] + " " + notes[numbersScale[2]] + " " + notes[numbersScale[3]] + " " + notes[numbersScale[4]] + " " + notes[numbersScale[5]] + " " + notes[numbersScale[6]]

    document.querySelector(".full-scale").textContent = fullScale;
    document.querySelector(".tonic").textContent = harmonicFunction.tonic;
    document.querySelector(".supertonic").textContent =harmonicFunction.supertonic;
    document.querySelector(".mediant").textContent = harmonicFunction.mediant;
    document.querySelector(".subdominant").textContent =harmonicFunction.subdominant;
    document.querySelector(".dominant").textContent = harmonicFunction.dominat;
    document.querySelector(".submediant").textContent =harmonicFunction.submediant;
    document.querySelector(".leading--tone").textContent =harmonicFunction.leadingTone;
    // }
    // }
    numbersScale = [];
  });


///////////////////////////////////////////////////
///////// RANDOM NOTES SEQUENCE GENERATOR /////////
///////////////////////////////////////////////////

  let melodyScale = [] //array with the notes of the "refNote" scale
  let melody = "" //string to output the sorted melody
  
  // hidde "scale" input if "Chromatic Scale" is on "refnote" and get back if other item is select
  document.querySelector('.scale--random-notes').addEventListener('change', function(){
      const scale = document.querySelector('.scale--random-notes').value
      scale === 'Chromatic Scale' ?
      document.querySelector('.hidden').style.display = "none" :
      document.querySelector('.hidden').style.display = "inherit"
  })
  
  document.querySelector('.find--random-notes').addEventListener('click', function(){
      const refNote = document.querySelector('.refnote--random-notes').value //get the input value of -Reference Note- field
      const scale = document.querySelector('.scale--random-notes').value //get the input value of -Scale- field
      const numberNotes = Number(document.querySelector('.number--random-notes').value) //get the input value of -Number of Notes- field and turn into a number
      const refNoteIndex = Number(notes.indexOf(refNote)) //find the index (position) of the refence note in the "notes" array
      document.querySelector('.message--random-notes').textContent = "" //set the .message to a empty string
      document.querySelector('.display-random-melody').textContent = "" //set the .display-random-melody to a empty string
  
      //set the melody scale array and display a message that the program is running with the inputs
      function setMelodyScale(){
          //display the following message, adding the string to the .message class on html file
          document.querySelector('.message--random-notes').textContent = `Generating a sequence of notes in ${refNote} ${scale} with ${numberNotes} notes`
  
          //for(let i=0;i<=numbersScale.length;i++){        // getting the index (let i) and checking if is above 11 (final index of "notes" array)
          for (const [i, el] of numbersScale.entries()){    // can do with "for loop" or "for-of loop", both works the same
              if(numbersScale[i]>11){
                  numbersScale[i] -= 12
              }
              melodyScale.push(notes[numbersScale[i]]) //match the Number Scale to the index of the Notes array to create the Melody Scale        
      }}
  
      //set a random melody based on the Number of Notes and the Melody Scale
      function setMelody(){
          for(let i=0; i<numberNotes; i++){                   // a loop to choose the random numbers according to the Number of Notes
          let noteNumber = Math.trunc(Math.random()*7)        // generate a number betwen 0 and 6 (7 numbers in total, for each note on the scale)
          melody = melody + " "+ melodyScale[noteNumber]      // 
          }
          document.querySelector('.display-random-melody').textContent = melody
      }
  
      if(scale === "Chromatic Scale"){
          document.querySelector('.message--random-notes').textContent = `Generating a sequence of notes in Chromatic Scale`
          melodyScale = notes;
          setMelody()
      } 
      else if(scale === "Major"){
          numbersScale.push(refNoteIndex, refNoteIndex+2, refNoteIndex+4, refNoteIndex+5, refNoteIndex+7, refNoteIndex+9, refNoteIndex+11)
          setMelodyScale()
          setMelody()
      } 
      else if(scale === "Minor"){
          numbersScale.push(refNoteIndex, refNoteIndex+2, refNoteIndex+3, refNoteIndex+5, refNoteIndex+7, refNoteIndex+8, refNoteIndex+10)
          setMelodyScale()
          setMelody()
      }
  
      melody = ""
      melodyScale = []
      numbersScale = []
  })

  ////////////////////////////////////////////////////
  ///////// RANDOM CHORDS SEQUENCE GENERATOR /////////
  ////////////////////////////////////////////////////
  
  let chordsHarmonicFunction = []
  let chordsSequence = " "

  document
    .querySelector(".find--chords-sequence")
    .addEventListener("click", function () {
      const refNote = document.querySelector(".refnote--chords-sequence").value;
      const scale = document.querySelector(".scale--chords-sequence").value;
      const refNoteIndex = Number(notes.indexOf(refNote));
      const numberOfChords = Number(document.querySelector('.number--chords-sequence').value) //get the input value of -Number of Notes- field and turn into a number

  
      function setMajorScaleChords() {
        chordsHarmonicFunction.push(
          (notes[numbersScale[0]] + "7M"),
          (notes[numbersScale[1]] + "m7"), 
          (notes[numbersScale[2]] + "m7"),
          (notes[numbersScale[3]] + "7M"), 
          (notes[numbersScale[4]] + "7"), 
          (notes[numbersScale[5]] + "m7"), 
          (notes[numbersScale[6]] + "m7(b5)"))

        setHarmony()
      }
  
      function setMinorScaleChords() {
        chordsHarmonicFunction.push(
          (notes[numbersScale[0]] + "m7"),
          (notes[numbersScale[1]] + "m7(b5)"),
          (notes[numbersScale[2]] + "7M"),
          (notes[numbersScale[3]] + "m7"),
          (notes[numbersScale[4]] + "m7"),
          (notes[numbersScale[5]] + "7M"),
          (notes[numbersScale[6]] + "7"))

        setHarmony()
      }
  
      if (scale === "Major") {
        numbersScale.push(
          refNoteIndex,
          refNoteIndex + 2,
          refNoteIndex + 4,
          refNoteIndex + 5,
          refNoteIndex + 7,
          refNoteIndex + 9,
          refNoteIndex + 11
        );
        setMajorScaleChords();
      } 
      else{
        numbersScale.push(
          refNoteIndex,
          refNoteIndex + 2,
          refNoteIndex + 3,
          refNoteIndex + 5,
          refNoteIndex + 7,
          refNoteIndex + 8,
          refNoteIndex + 10
        );
        setMinorScaleChords();
      }
  
    const fullScale = notes[numbersScale[0]] + " " + notes[numbersScale[1]] + " " + notes[numbersScale[2]] + " " + notes[numbersScale[3]] + " " + notes[numbersScale[4]] + " " + notes[numbersScale[5]] + " " + notes[numbersScale[6]]
    document.querySelector(".full-scale--chords").textContent = fullScale;
    
    //set a random melody based on the Number of Notes and the Melody Scale
    function setHarmony(){
      for(let i=0; i<numberOfChords; i++){                   // a loop to choose the random numbers according to the Number of Notes
      let chordNumber = Math.trunc(Math.random()*7)        // generate a number betwen 0 and 6 (7 numbers in total, for each note on the scale)
      chordsSequence = chordsSequence + " "+ chordsHarmonicFunction[chordNumber]      // 
      }
      document.querySelector('.display-random-harmony').textContent = chordsSequence
      chordsSequence = " "
    }

      document.querySelector(".display-harmonic-fnc").textContent = chordsHarmonicFunction
      document.querySelector(".message--chords-sequence").textContent = `Generating a Chord Progression in ${refNote} ${scale} with ${numberOfChords}:`;

      numbersScale = [];
      chordsHarmonicFunction = [];

    });