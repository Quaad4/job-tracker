<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    //
    public function index() 
    {
        return Application::all();
    }

    public function store(Request $request) 
    {

        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'status' => 'required|in:applied,interview,offer,rejected',
            'date_applied' => 'required|date',
            'notes' => 'nullable|string',
            'salary_min' => 'nullable|integer',
        ]);

        $application = Application::create([...$validated, 'user_id' => 1]);

        return response()->json($application, 201);
    }

    public function show(Application $application) 
    {
        return response()->json($application);
    }
}
