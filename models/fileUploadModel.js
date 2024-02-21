const fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  path: String,
});

const FileData = mongoose.model('file', fileSchema);
export default FileData;