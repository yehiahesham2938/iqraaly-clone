const Audiobook = require('../models/audioBook');

const handleError = (response, status,message) => 
    {
    return response.status(status).json(
      { 
          success: false, message 
      }
  );
  };
  
  
  const handleSuccess =(response, status,data) => 
    {
    return response.status(status).json(
      { 
          success: true, ...data 
      }
  );
  };


exports.addAudiobook = async(request, response) => {
  try {
    const { title, author, file_url, duration, category } = request.body;

    const audiobook = new Audiobook(
    {
      title, author, file_url, duration, category
    }
);

    await audiobook.save();
    handleSuccess(response, 201, { audiobook });

  }
   catch (error) {
    handleError(response, 500, 'Failed to add audiobook');
  }
};

exports.getAllAudiobooks =async(request, response) => {
  try 
  {
    const audiobooks =await Audiobook.find().select('-__v');
    handleSuccess(response, 200, { audiobooks });
  } 
  catch (error) {
    handleError(response, 500, 'error to fetch audiobooks');
  }
};


exports.getAudiobook = async (request, response) => {
  try {
    const audiobook = await Audiobook.findById(request.params.id);
    if (!audiobook)
        {
            return handleError(response, 404, 'Audiobook not found');
        } 
    handleSuccess(response, 200, { audiobook });
  } 
  catch (error) {
    handleError(response, 500, 'Failed to fetch audiobook');
  }
};