<?php

namespace App\Http\Controllers;

use App\Models\Shortage;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ShortageController extends Controller
{
    public function list(Request $request)
    {
        $shortage = Shortage::my(['group_id' => Auth::user()->group_id, 'id' => Auth::user()->id])->paginate(3);
        return Inertia::render('Shortage/List', [
            'shortage' => $shortage,
        ]);
    }
    public function edit(Request $request)
    {
        $shortageId = $request->shortage_id;
        $shortage = Shortage::where('id', $shortageId)->firstOrFail();
        return Inertia::render('Shortage/Edit', [
            'shortage' => $shortage,
        ]);
    }
    public function link($shortage_url)
    {
        $find = Shortage::code(['shortage_url' => $shortage_url])->firstOrFail();
        return Inertia::location($find->full_url);
    }
    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'full_url' => 'required|url'
            ]);
            $data = [
                'full_url' => $request->full_url,
                'shortage_url' => Str::random(5),
                'updated_by' => Auth::user()->id
            ];

            Shortage::id(['id' => $request->id])->update($data);
            DB::commit();
            return redirect()->route('shortage.list');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function create(Request $request)
    {

        DB::beginTransaction();
        try {
            $request->validate([
                'full_url' => 'required|url'
            ]);
            $data = [
                'full_url' => $request->full_url,
                'shortage_url' => Str::random(5),
                'created_by' => Auth::user()->id
            ];

            Shortage::insert($data);
            DB::commit();
            return redirect()->route('shortage.list');
        } catch (Exception $e) {
            dd($e->getMessage());
            DB::rollBack();

            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function destroy(Request $request)
    {
        DB::beginTransaction();
        try {
            Shortage::where('id', $request->id)->delete();
            DB::commit();
            $result = ['message' => 'success'];
            $code = 200;
        } catch (Exception $e) {
            DB::rollBack();
            $result = ['message' => $e->getMessage()];
            $code = 500;
        }
        return response()->json($result, $code);
    }
}
