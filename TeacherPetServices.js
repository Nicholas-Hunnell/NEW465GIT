const express = require('express');
const {MongoClient} = require("mongodb");
const app = express();

const port = 3000;
const hostname = '127.0.0.1';

//MongoDB Connection
const uri = "mongodb+srv://admin:admin@cluster0.lv5o6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

//////////////////////////////////////////////   User Accounts   //////////////////////////////////////
app.use(express.json());

app.post('/user/create_user', async (req, res) => {

    //check if the email is already in use
    const emailTaken = await client.db("TeachersPet").collection("Users").findOne({Email: req.body.Email})

    if (emailTaken) {
        res.status(201).json({
            message: 'Error: email ' + req.body.Email + " is already in use."
        });
    } else {
        const user = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            CollegeName: req.body.CollegeName,
            Email: req.body.Email
        };

        const result = client.db("TeachersPet").collection("Users").insertOne(user);
        res.status(201).json({
            message: 'Successfully called user/create_user\nFirstName ' + user.FirstName
        });
    }
});

app.post('/user/modify_user', (req, res) =>{
    res.status(201).json({
        message: 'Successfully called user/modify_user'
    });
});

app.delete('/user/delete_user', async (req, res) => {
    const result = await client.db("TeachersPet").collection("Users").findOne({"Email": req.body.Email});

    if(result) {
        const result = await client.db("TeachersPet").collection("Users").deleteOne({"Email": req.body.Email});
        res.status(200).json({
            message: 'Successfully deleted user ' + req.body.Email
        });
    }
    else{
        res.status(200).json({
            message: 'Error: No user with that email'
        });
    }
});


app.get('/user/get_user_by_ID', async (req, res) => {
    const result = await client.db("TeachersPet").collection("Users").find({_id: req.body.id});

    if(result.Email != null) {
        const resultArr = await result.toArray();
        console.log(resultArr);
        res.status(200).json({
            message: 'User info: ' + JSON.stringify(resultArr[0]),
            user: resultArr[0]
        });
    }
    else{
        res.status(200).json({
            message: 'Error: no user with that ID'
        });
    }
});

app.get('/user/get_user_by_email', async (req, res) => {
    const result = await client.db("TeachersPet").collection("Users").find({"Email": req.body.Email});
    const resultArr = await result.toArray();

    if(resultArr[0] != null){
        res.status(200).json({
            message: 'User info: ' + JSON.stringify(resultArr[0]),
            user: resultArr[0]
        });
    }
    else{
        res.status(200).json({
            message: 'Error: no user with that email'
        });
    }
});

app.get('/user/get_id_by_email', async (req, res) => {
    const result = await client.db("TeachersPet").collection("Users").findOne({"Email": req.body.Email});

    if (result.Email == null) {
        res.status(200).json({
            message: 'ERROR: No user with that email.'
        });
    } else {
        res.status(200).json({
            message: 'id: ' + result._id
        });
    }
});

app.post('/user/update_last_login', async (req, res) => {
    const result = await client.db("TeachersPet").collection("LastLogin").updateOne(
        {
            UserID: req.body.UserId
        },
        {
            $set:{
                TimeofLast: new Date()
            }
        },
        {$upsert: true}
    );

    console.log(result);
    if(result.upsertedCount == 0){
        returnMessage = "ERROR: incorrect user id, none match the given userID"
    }
    else{
        returnMessage: 'Successfully updated last login.'
    }

    res.status(200).json({
            message: returnMessage
    })
})


////////////////////////////////////////////   CANVAS   ///////////////////////////////////////////

app.get('/canvas/get_all_class_names', (req, res) => {
    res.status(200).json({
        message: 'Successfully called canvas/get_all_class_names'
    });
});

app.get('/canvas/get_grades', (req, res) => {
    res.status(200).json({
        message: 'Successfully called canvas/get_grades'
    });
});

app.get('/canvas/get_canvas_account_info', (req, res) => {
    res.status(200).json({
        message: 'Successfully called canvas/get_canvas_account_info'
    });
});

app.get('/canvas/get_single_class', (req, res) => {
    res.status(200).json({
        message: 'Successfully called canvas/get_single_class'
    });
});

app.get('/canvas/get_all_open_assignments_for_class', (req, res) => {
    res.status(200).json({
        message: 'Successfully called canvas/get_all_open_assigments_for_class'
    });
});

app.get('/canvas/get_assignment_grade', (req, res) => {
    res.status(200).json({
        message: 'Successfully called canvas/get_assignment_grade'
    });
});


////////////////////////////////////////////  ////////////////////////////////////////////








///////////////////////////////////////////////////////    Google classroom    //////////////////////////////////////////////////
app.get('/Gclass/get_courses', (req, res) => {
    res.status(200).json({
        message: 'Successfully called Gclass/get_courses'
    });
});

app.get('/Gclass/get_grades', (req, res) => {
    res.status(200).json({
        message: 'Successfully Gclass/get_grades'
    });
});

app.get('/Gclass/get_account_info', (req, res) => {
    res.status(200).json({
        message: 'Successfully called Gclass/get_account_info'
    });
});

app.get('/Gclass/get_user_profile', (req, res) => {
    res.status(200).json({
        message: 'Successfully called Gclass/get_user_profile'
    });
});

app.get('/Gclass/get_user_profile', (req, res) => {
    res.status(200).json({
        message: 'Successfully called Gclass/get_user_profile'
    });
});



////////////////////////////////////////////////////////////    Awards   /////////////////////////////////////////////

app.get('/Awards/get_Medal_Verification', (req, res) => {
    res.status(200).json({
        message: 'Successfully called Awards/get_Medal_Verification'
    });
});

app.post('/Awards/Post_Medal', (req, res) => {
    res.status(201).json({
        message: 'Successfully called Awards/Post_Medal'
    });
});

////////////////////////////////////////////////////////Grade Review////////////////
app.post('/GReview/Course_And_Grade', (req, res) => {
    res.status(201).json({
        message: 'Successfully called GReview/Course_And_Grade'
    });
});

app.post('/Greview/Assignment_And_Grade', (req, res) => {
    res.status(201).json({
        message: 'Successfully called Greview/Assignment_And_Grade'
    });
});

/////////////////////////////////////////////////////////////  Grades Help ////////////////////////////////////////////////

app.get('/GradeHelp/get_suggested_help_websites', (req,res) =>{
    res.status(200).json({
        message: 'Successfully called GradeHelp/get_suggested_help_websites'
    });
});

app.get('/GradeHelp/get_suggested_help_tutoring', (req,res) =>{
    res.status(200).json({
        message: 'Successfully called GradeHelp/get_suggested_help_tutoring'
    });
});

app.post('/GradeHelp/post_suggested_help', (req,res) =>{
    res.status(200).json({
        message: 'Successfully called post_suggested_help'
    });
});

// Start the Express server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



