<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Image;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::all();
        return $students;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->file('image')){
            $file      = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $image     = 'Student_'.time().'.'.$extension;
            Image::make($file)->save(public_path()."/images/".$image);
        }

        $student = new Student();

        $student->image = $image;
        $student->name = $request->name;
        $student->save();
        return $student;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if ($student){
            if ($request->file('image')){
                unlink(public_path()."/images/".$student->image);
                $file      = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $image     = 'Student_'.time().'.'.$extension;
                Image::make($file)->save(public_path()."/images/".$image);
                $student->image = $image;
            }

            $student->name = $request->name;
            $student->save();
            return $student;

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student, $id)
    {
        $deleteStudent = Student::findOrFail($id);
        unlink(public_path()."/images/".$deleteStudent->image);
        $deleteStudent->delete();

//        return $deleteStudent;
    }
}
