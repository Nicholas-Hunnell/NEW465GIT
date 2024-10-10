const express = require('express');
const app = express();

const port = 3000;
const hostname = '127.0.0.1';

//////////////////////////////////////////////   User Accounts   //////////////////////////////////////
app.post('/user/create_user', (req, res) => {
    res.status(201).json({
        message: 'Successfully called user/create_user'
    });
});

app.post('/user/modify_user', (req, res) =>{
    res.status(201).json({
        message: 'Successfully called user/modify_user'
    });
});

app.delete('/user/delete_user', (req, res) => {
    res.status(200).json({
        message: 'Successfully called user/delete_user'
    });
});

app.get('/user/get_user_by_ID', (req, res) => {
    res.status(200).json({
        message: 'Successfully called user/get_user_by_ID'
    });
});




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

app.get('/Gclass/get_user_profile', (req, res) => {
    res.status(200).json({
        message: 'Successfully called Gclass/get_user_profile'
    });
});

app.get('/Gclass/get_assignment_grade', (req, res)=> {
    res.status(200).json( {
        message: 'Successfully called Gclass/get_assignment_grade'
    });
});

app.get('/Gclass/get_all_courses', (req, res) => {
    res.status(200).json({
        message: 'Successfully called Gclass/get_all_courses'
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

