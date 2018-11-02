$.ajax(
{
    url: 'https://raw.githubusercontent.com/Bdb253/HRJsonProject/master/DeptData.json',
    dataType: 'json',
    success:function(data)
    {
        //iterate over the data and append a selet option
        $.each(data, function(key, val)
        {
            var option = $('<option id="' + val.DeptID + '">' + val.DeptDescr + '</option>');
            $('#DeptSelect').append(option);
        })
    },
    error:function()
    {
        //if there is an error aapend a 'none avaliable' option
        $select.html('<option id="-1">NONE AVAILABLE</option>');
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
    $('#result1').append("<h2>Employment Relations</h2>");

    $.getJSON('https://raw.githubusercontent.com/Bdb253/HRJsonProject/master/DeptData.json', function(data)
    {
        $.each(data, function(key, val)
        {
            if(id == val.DeptDescr)
            {
                $('#result1').append('<p>' + val["Employee Relations1"] + '<br>' + val["Employee Relations2"] + '</p>');
            }
        });

    });
}

function compensation(id)
{
    //display section header
    $('#result2').append("<h2>Compensation</h2>");

    $.getJSON('https://raw.githubusercontent.com/Bdb253/HRJsonProject/master/DeptData.json', function(data)
    {
        $.each(data, function(key, val)
        {
            if(id == val.DeptDescr)
            {
                $('#result2').append('<p>' + val.Compensation1 + '<br>' + val.Compensation2 + '</p>');
            }
        })
    });
}

function employment(id)
{
    //display section header
    $('#result3').append("<h2>Employment</h2>");

    $.getJSON('https://raw.githubusercontent.com/Bdb253/HRJsonProject/master/DeptData.json', function(data)
    {
        $.each(data, function(key, val)
        {
            if(id == val.DeptDescr)
            {
                $('#result3').append('<p>' + val.Employment1 + '<br>' + val.Employment3 + '</p>');
            }
        });
    });

}

function employeePay(id)
{
    //display section header
    $('#result4').append("<h2>Employee Pay Services</h2>");

    $.getJSON('https://raw.githubusercontent.com/Bdb253/HRJsonProject/master/DeptData.json', function(data)
    {
        $.each(data, function(key, val)
        {
            if(id == val.DeptDescr)
            {
                $('#result4').append('<p>' + val["Employee Pay Services1"] + '<br>' + val["Employee Pay Services2"] + '</p>');
            }
        });
    });
}
