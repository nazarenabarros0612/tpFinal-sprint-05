import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    officialName: {
      type: String,
      required: [true, "El nombre oficial es obligatorio"],
      minlength: [3, "Debe tener mínimo 3 caracteres"],
      maxlength: [90, "Debe tener máximo 90 caracteres"],
      unique: true,
      trim: true
    },

    capital: {
      type: [String],
      validate: {
        validator: function (capitals) {
          return capitals.every(
            capital => capital.length >= 3 && capital.length <= 90
          );
        },
        message: "Cada capital debe tener entre 3 y 90 caracteres"
      }
    },

    borders: {
      type: [String],
      validate: {
        validator: function (borders) {
          return borders.every(border => /^[A-Z]{3}$/.test(border));
        },
        message: "Cada border debe tener exactamente 3 letras mayúsculas"
      }
    },

    area: {
      type: Number,
      required: true,
      min: [0, "El área debe ser positiva"]
    },

    population: {
      type: Number,
      required: true,
      min: [0, "La población debe ser positiva"]
    },

    timezones: {
      type: [String]
    },

    gini: {
      type: Number,
      min: [0, "El gini debe ser mayor o igual a 0"],
      max: [100, "El gini debe ser menor o igual a 100"]
    },

    creator: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;