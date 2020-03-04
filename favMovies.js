$(document).ready(function(){

    //some declarations
    var arrayOfMoviesObj = [], flagForTitleClick=false, flagForRateClick=false;
    var indexOfRow=0;

    //handling the add movie case
    $('#addMovieBtn').click(function(){
        var movieTitle = $('#movieTitle').val();
        var movieRate = $('#movieRate').val();
        if(!(movieTitle == '' || movieRate == '')){
            //addNewRowToTable(movieTitle,movieRate,indexOfRow);
            $('#moviesTable tbody').append('<tr id="'+indexOfRow+'">' + '<td>'+ movieTitle + '</td>'+'<td>' + movieRate + '</td>'+ '<td><button type="button" class="btn btn-danger btnDelete">Delete</button></td>'+'</tr>');
            $('#listOfMovies').append('<Option value='+ movieTitle + '>');
            var obj = {movie:movieTitle , rate:movieRate};
            arrayOfMoviesObj.push(obj);
            $('#movieTitle').val('');
            $('#movieRate').val('');
            indexOfRow++;
        }
    })//end-add movie

    //delete function
    $(document).on('click','.btn-danger',function(event){
        var index = $(this).closest('tr').attr('id');
        indexOfRow--;
        arrayOfMoviesObj.splice(index,1);
        console.log(arrayOfMoviesObj);
       $(this).closest('tr').remove();  
    }) //end of delete function

    

    //handling title sorting
    $('#title').click(function(){
    $('#title').css("color", "green");
    $('#rate').css("color", "white");
    $('#delete').css("color", "white");
    var newIndexOfRow=0;
    if(arrayOfMoviesObj.length>1){
    arrayOfMoviesObj=mySortFunction(arrayOfMoviesObj,compareByTitle);
    flagForTitleClick=!flagForTitleClick;
    $('#moviesTable tbody > tr').remove();
    arrayOfMoviesObj.forEach((element)=> { $('#moviesTable tbody').append('<tr id = "'+newIndexOfRow+'">' + '<td>'+ element.movie + '</td>'+'<td>' + element.rate + '</td>'+ '<td><button type="button" class="btn btn-danger btnDelete">Delete</button></td>'+'</tr>')
        newIndexOfRow++;
    })
        }    
    })//end-title sorting

    //handling rate sorting
    $('#rate').click(function(){
    $('#title').css("color", "white");
    $('#rate').css("color", "green");
    $('#delete').css("color", "white");
    var newIndexOfRow=0;
    if(arrayOfMoviesObj.length>1){
    arrayOfMoviesObj=mySortFunction(arrayOfMoviesObj,compareByRate);
    flagForRateClick=!flagForRateClick;
    $('#moviesTable tbody > tr').remove();
    arrayOfMoviesObj.forEach(element=> { $('#moviesTable tbody').append('<tr id = "'+newIndexOfRow+'">' + '<td>'+ element.movie + '</td>'+'<td>' + element.rate + '</td>'+ '<td><button type="button" class="btn btn-danger btnDelete">Delete</button></td>'+'</tr>')
        newIndexOfRow++;
            })
        }    
    })//end-title sorting


    //general sort function 
    function mySortFunction(arr,compare){
        return arr.sort(compare);
    } //end of general sort function



// #2 functions for sorting 

    //function that sort rows by title
    function compareByTitle(frstObj,scndObj){
        return !flagForTitleClick ? frstObj.movie.localeCompare(scndObj.movie):scndObj.movie.localeCompare(frstObj.movie)
   }

   //function that sort rows by rate
    function compareByRate(frstObj,scndObj){
        return !flagForRateClick ? frstObj.rate - scndObj.rate : scndObj.rate - frstObj.rate
    }
    //end of sorting functions
})
