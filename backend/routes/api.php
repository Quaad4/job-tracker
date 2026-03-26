<?php

use App\Http\Middleware\Cors;
use App\Http\Controllers\ApplicationController;
use Illuminate\Support\Facades\Route;

Route::get('/applications', [ApplicationController::class, 'index']);
Route::post('/applications', [ApplicationController::class, 'store']);
Route::get('/applications/{application}', [ApplicationController::class, 'show']);
Route::put('/applications/{application}', [ApplicationController::class, 'update']);
Route::delete('/applications/{application}', [ApplicationController::class, 'destroy']);