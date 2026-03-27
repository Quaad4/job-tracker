<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Models\Application;

class ApplicationController extends Controller
{
    //
    public function index() 
    {
        return ApplicationResource::collection(Application::all());
    }

    public function store(StoreApplicationRequest $request) 
    {
        $application = Application::create([...$request->validated(), 'user_id' => 1]);

        return response()->json(new ApplicationResource($application), 201);
    }

    public function show(Application $application) 
    {
        return response()->json(new ApplicationResource($application));
    }

    public function update(UpdateApplicationRequest $request, Application $application) 
    {
        $application->update($request->validated());

        return response()->json(new ApplicationResource($application), 200);
    }

    public function destroy(Application $application) 
    {
        $application->delete();

        return response()->noContent();
    }
}
