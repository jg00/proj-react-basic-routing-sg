import axios from "axios";
import React, { useState, useEffect } from "react";

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  // Debounce text input step 1
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  // Debounce text input step 2
  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: `AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM`,
          },
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [debouncedText, language]);

  return (
    <div>
      <h1>{translated}</h1>
    </div>
  );
};

export default Convert;

/*
  Google Translation API.  Paid service.  Below is a test key only.
  AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM
  This API can only be used when your browser is at ‘http://localhost:3000’
*/

/*
 // Reference only - before debouncing text change
  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: text,
            target: language.value,
            key: `AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM`,
          },
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, text]);
*/
