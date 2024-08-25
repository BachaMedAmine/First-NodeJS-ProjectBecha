module.exports = mongoose => {
  // Define the schema first
  const schema = mongoose.Schema(
      {
          title: String,
          description: String,
          published: Boolean
      },
      { timestamps: true }
  );

  // Add the toJSON method to the schema
  schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
  });

  // Create and return the model using the defined schema
  const Tutorial = mongoose.model("tutorial", schema);

  return Tutorial;
};
