module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      address: String,
      name: String,
      owner: String,
      feeType: String,
      feeAmount: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Yeve = mongoose.model("yeve", schema);
  return Yeve;
};
