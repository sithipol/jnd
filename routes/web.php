<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/shortage/list', [ShortageController::class, 'list'])->name('shortage.list');
    Route::get('/shortage/{shortage_id}/edit', [ShortageController::class, 'edit'])->name('shortage.edit');
    Route::get('/shortage/{shortage_url}', [ShortageController::class, 'link'])->name('shortage.link');
    Route::patch('/shortage', [ShortageController::class, 'update'])->name('shortage.update');
    Route::post('/shortage', [ShortageController::class, 'create'])->name('shortage.create');
    Route::delete('/shortage/{id}', [ShortageController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
