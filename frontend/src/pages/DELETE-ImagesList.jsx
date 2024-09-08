import React from 'react';

const ImagesList = ({ images, onDeleteImage }) => {
    return (
        <div>
            <div>
                <h2>Selected Images</h2>
                <div className="flex flex-wrap">
                    {images.map((image, index) => (
                        <div key={index} className="m-2 relative">
                            <img src={URL.createObjectURL(image)} alt="Selected Image" className="w-32 h-32 object-cover" />
                            <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                onClick={() => onDeleteImage(index)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImagesList;