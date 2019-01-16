$.ajax(
  {
    //google spreadsheets to json http://www.ravelrumba.com/blog/json-google-spreadsheets/
    $feed = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vROb0Zy_70qkx0aE8UD68rBFX6c7q256Dbi7dWrisx7fWf9c2FTkP-bB3-7PNv9ESZI8laMsLXgWvgv/pub?gid=1055648349&single=true&output=csv';

    // Arrays we'll use later
    $keys = array();
    $newArray = array();

    // Function to convert CSV into associative array
    function csvToArray($file, $delimiter) {
      if (($handle = fopen($file, 'r')) !== FALSE) {
        $i = 0;
        while (($lineArray = fgetcsv($handle, 4000, $delimiter, '"')) !== FALSE) {
          for ($j = 0; $j < count($lineArray); $j++) {
            $arr[$i][$j] = $lineArray[$j];
          }
          $i++;
        }
        fclose($handle);
      }
      return $arr;
    }

    // Do it
    $data = csvToArray($feed, ',');

    // Set number of elements (minus 1 because we shift off the first row)
    $count = count($data) - 1;

    //Use first row for names
    $labels = array_shift($data);

    foreach ($labels as $label) {
      $keys[] = $label;
    }

    // Add Ids, just in case we want them later
    $keys[] = 'id';

    for ($i = 0; $i < $count; $i++) {
      $data[$i][] = $i;
    }

    // Bring it all together
    for ($j = 0; $j < $count; $j++) {
      $d = array_combine($keys, $data[$j]);
      $newArray[$j] = $d;
    }

    // Print it out as JSON
    echo json_encode($newArray);

    $jsonobject = json_encode($newArray);


    // Start of HR dropdown code
    $.getJSON(jsonobject, function(data)
    {
      //iterate over the data and append a selet option
      $.each(data, function(key, val)
      {
        var option = $('<option id="' + val.DeptID + '">' + val.DeptDescr + '</option>');
        $('#DeptSelect').append(option);
      })
    }
  },
  error:function()
  {
    //if there is an error aapend a 'none avaliable' option
    $('#DeptSelect').append('<option id="-1">NONE AVAILABLE</option>');
  }
})

function showInfo()
{
  //clear previous results
  $('#result1').html('');
  $('#result2').html('');
  $('#result3').html('');
  $('#result4').html('');

  //get the id of the select
  var id = $('#DeptSelect').val()

  //display all the relevant data for the department
  employeeRelations(id);
  compensation(id)
  employment(id);
  employeePay(id);
}

function employeeRelations(id)
{
  //display section header
  $('#result1').append("<h2>Employment Relations</h2>"+
  '<ul><li>Problem solving for employees and managers on Human Resource issues</li>'+
  '<li>Organizational effectiveness</li>'+
  '<li>Performance appraisals and performance concerns</li>'+
  '<li>Disciplinary actions</li>'+
  '<li>NAU Human Resources and ABOR personnel policy interpretation</li>'+
  '<li>Compliance with federal and state law</li></ul>');

  $.getJSON('https://bdb253.github.io/HRJsonProject/DeptData.json', function(data)
  {
    $.each(data, function(key, val)
    {
      //dispaly the correct people based off drop down
      if(id == val.DeptDescr)
      {
        var person1 = '<p>' + val["Employee Relations1"] + '<br>' +'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        var person2 = '<p>' + val["Employee Relations2"] + '<br>' +'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        $('#result1').append(person1 + '<br>' + person2);
      }
    });

  });
}

function compensation(id)
{
  //display section header
  $('#result2').append("<h2>Compensation</h2>" +
  '<ul><li>Special assignments</li>'+
  '<li>Workforce planning and salary adjustments</li>'+
  '<li>Classified staff pay grades and salary ranges</li>'+
  '<li>Job classification titles and descriptions</li>'+
  '<li>Service professional compensation guidelines</li></ul>');

  $.getJSON('https://bdb253.github.io/HRJsonProject/DeptData.json', function(data)
  {
    $.each(data, function(key, val)
    {
      //dispaly the correct people based off drop down
      if(id == val.DeptDescr)
      {
        var person1 = '<p>' + val.Compensation1 + '<br>' +'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        var person2 = '<p>' + val.Compensation2 + '<br>' +'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        $('#result2').append(person1 + '<br>' + person2);
      }
    })
  });
}

function employment(id)
{
  //display section header
  $('#result3').append("<h2>Employment</h2>" +
  '<p>Hiring process for staff' +
  '<ul><li>Classified Staff (Hire Smart)</li>'+
  '<li>Service Professional (Hire Smart)</li>'+
  '<li>Temporary Employees</li>'+
  '<li>Student Workers</li></ul>' +
  'Jop Requisiton Analysis' +
  '<ul><li>Establishing Titles</li>' +
  '<li>Establishing posting ranges</li></ul>' +
  'Job Postings'+
  '<ul><li>Posting on HR Website</li>' +
  '<li>Closing a posting</li></ul>' +
  'New Employee Hiring/Onboarding' +
  'Background and Fingerprint Checking</p>');

  $.getJSON('https://bdb253.github.io/HRJsonProject/DeptData.json', function(data)
  {
    $.each(data, function(key, val)
    {
      //dispaly the correct people based off drop down
      if(id == val.DeptDescr)
      {
        var person1 = '<p>' + val.Employment1 + '<br>' +'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        var person2 = '<p>' + val.Employment3 + '<br>' +'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        $('#result3').append(person1 + '<br>' + person2);
      }
    });
  });

}

function employeePay(id)
{
  //display section header
  $('#result4').append("<h2>Employee Pay Services</h2>" +
  '<p>Employee Pay Questions' +
  '<ul><li>Benefit eligible employees</li>'+
  '<li>Benefit eligible employees</li>'+
  '<li>Federal Work Study</li>'+
  '<li>Federal Work Study</li>'+
  '<li>Extended Campuses part-time instructors</li></ul>' +
  'ePAR Processing' +
  '<ul><li>Initiating ePARS</li>' +
  '<li>ePAR approval issues</li></ul>' +
  'End of employment pay issues'+
  '<ul><li>vacation payouts</li>' +
  '<li>final pay calculations</li></ul>' +
  'Online Time Processing' +
  'Employee pay discrepancies'+
  'New Employee Hiring Packet Processing (Hire Xpress)' +
  'Off Cycle Check Processing</p>');

  $.getJSON('https://bdb253.github.io/HRJsonProject/DeptData.json',
  function(data)
  {
    $.each(data, function(key, val)
    {
      //dispaly the correct people based off drop down
      if(id == val.DeptDescr)
      {
        var person1 = '<p>' + val["Employee Pay Services1"] + '<br>' + 'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        var person2 = '<p>' + val["Employee Pay Services2"] + '<br>' + 'title'+ '<br>' + 'email' + '<br>' + 'phone' + '</p>';
        $('#result4').append(person1 + '<br>' + person2);
      }
    });
  });
}
