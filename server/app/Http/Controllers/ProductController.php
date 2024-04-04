<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Image;
use App\Models\Thumbnail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get all products with thumbnails
        $products = DB::table('products')
                     ->join('thumbnails', 'products.id', '=', 'thumbnails.product_id')
                     ->select('products.*', 'thumbnails.thumbnail')
                     ->get();
    
        // Iterate through each product to retrieve associated images
        foreach ($products as $product) {
            $product->images = Image::where('product_id', $product->id)->get();
        }
    
        return $products;
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
 

public function store(Request $request)
{

    // Validate request data
    $fields = $request->validate([
        'name' => 'required|string',
        'description' => 'required|string',
        'price' => 'required|numeric|min:0',
        'category' => 'required|string',
        'width' => 'required|string',
        'shipping' => 'boolean',
        'dimension' => 'string',
    ]);
// dd($request->file('images'));
    // Logic for saving user data
    try {
        DB::beginTransaction();

        // Assuming you have a Product model
        $product = Product::create($fields);
        $product_id = $product->id;
        $destinationPath = public_path('temple/');

        // Handle multiple images
        if ($request->hasFile('images')) {
            // Get the array of files
            
            $req = $request->file('images');
     
    
        // $extension = $req->getClientOriginalExtension();
        // $filename = time() . '.' . $extension;
    
        // // Upload the new file
        // $req->move($destinationPath, $filename);
    
        // // Save the thumbnail in thumbnails table
        // $img = new Image();
        // $img->product_id = $product_id;
        // $img->image = 'temple/' . $filename;
        // $img->save();
            // Loop through each file
            foreach ($req as $imageFile) {
                // Get the file extension
                $extension = $imageFile->getClientOriginalExtension();
        
                // Generate a unique filename
                $imageName = time() . '.' . $extension;
        
                // Move the file to the destination path
                $imageFile->move($destinationPath, $imageName);
        
                // Create a new Image model instance
                $img = new Image();
        
                // Set the product_id and image properties
                $img->product_id = $product_id;
                $img->image = 'temple/' . $imageName;
        
                // Save the image record to the database
                $img->save();
            }
        }
        // Handle thumbnail
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
        
            // Upload the new file
            $file->move($destinationPath, $filename);
        
            // Save the thumbnail in thumbnails table
            $thumbnail = new Thumbnail();
            $thumbnail->product_id = $product_id;
            $thumbnail->thumbnail = 'temple/' . $filename;
            $thumbnail->save();
        }

        DB::commit();

        $response = [
            'message' => 'Product created'
        ];

        return response($response, 201);
    } catch (\Exception $e) {
        // Something went wrong, rollback changes
        DB::rollBack();

        $response = [
            'message' => 'Error creating product',
            'error' => $e->getMessage(),
        ];

        return response($response, 500);
    }
}


    // // Testin the upload files functionality
    // public function postProducts(Request $request) {
    //     if ($request->has('images')) {

    //         foreach($request->file('images') as $image) {

    //             $imageName= '2__image_'.time().rand(1,1000).'.'.$image->extension();

    //             // store the images in s3
    //             $image->storeAs('test/2', $imageName, 's3');


    //         }
    //     }
    // }


    // GET a Single Product Function
    // public function getProduct($id) {
    //     $product = Product::find($id);
    //     if (!$product){
    //         return response([
    //             'message' => 'No Product with the ID: '.$id
    //         ], 401);
    //     }
    //     // $images = $product->images;
    //     // $product->images;
    //     // $product->thumbnail->thumbnail;

    //     $response = [
    //         'product' => $product,
    //         // 'images' => $images
    //     ];

    //     return response($response, 200);
    //     // return response($product, 200);
    // }

 public function getProduct($id) {
    // Retrieve product details
    $product = Product::find($id);

    // Retrieve images associated with the product (excluding the thumbnail)
    $images = Image::where('product_id', $id)->get();

    // Retrieve thumbnail associated with the product
    $thumbnail = Thumbnail::where('product_id', $id)->first();

    // Build the response array
    $response = [
        'product' => $product,
        'images' => [],  // Initialize an empty array for other images
    ];

    // If a thumbnail is found, add it to the response
    if ($thumbnail) {
        $response['thumbnail'] = $thumbnail;
    }

    // Add other images to the response array
    foreach ($images as $image) {
        $response['images'][] = $image;
    }

    return response($response, 200);
}



    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        // return Product::update($request->all());
        return Product::find($request->id)->update($request->all());


        // // validate request data
        // $fields = $request->validate([
        //     'name' => 'required|string',
        //     'description' => 'required|string',
        //     'price' => 'required',
        //     'category' => 'required|string',
        //     'brand' => 'required|string',
        //     'shipping' => 'required|boolean',
        //     'sku' => 'string',
        //     'colors' => 'string'
        // ]);

        // // store the data in the products table
        // Product::update($fields);

        // // get the product id
        // $id = $request->id;

        // // get the request images
        // if ($request->has('images')) {
        //     // loop through the images
        //     foreach($request->file('images') as $image) {

        //         $imageName= $id.'_'.$fields['name'].'_image_'.time().rand(1,1000).'.'.$image->extension();

        //         // store the images in s3
        //         $path = $image->storeAs('products/'.$id, $imageName, 's3');

        //         // store the images in the images table
        //         Image::create([
        //             'product_id' => $id,
        //             'image' => $path
        //         ]);
        //     }
        // }

        // $response = [
        //     'message' => 'Product created'
        // ];

        // return response($response, 201);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $path = 'products/'.$id;
        Storage::disk('s3')->deleteDirectory($path);

        return Product::destroy($id);

        // return Product::find($id)->delete();

        // $product = Product::find($id);
        // $product->delete();
    }
}
