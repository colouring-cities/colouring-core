ALTER TABLE planning_data
    ALTER planning_application_id TYPE VARCHAR(50),
    ALTER planning_application_link TYPE VARCHAR(260),
    ALTER status TYPE VARCHAR(50),
    ALTER status_before_aliasing TYPE VARCHAR(50),
    ALTER status_explanation_note TYPE VARCHAR(250),
    ALTER data_source TYPE VARCHAR(70),
    ALTER data_source_link TYPE VARCHAR(150),
    ALTER address TYPE VARCHAR(300);
