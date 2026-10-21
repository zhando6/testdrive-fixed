(function ($) {
    $(document).ready(function () {
        // Vehicle models - All genuine Mercedes-Benz models
        var cars = [
            'S500 Cabriolet AMG',
            'GLE 400 AMG',
            'GLC 250D 4MATIC',
            'CLA SB Standard'
        ];
        var counter = 0;

        var elWrap = $('#slider');
        var slides = elWrap.find('.slide-item');
        var totalSlides = slides.length;

        function showSlide(index) {
            slides.hide();
            slides.eq(index).fadeIn(350);
        }

        // Slider Navigation
        $('#slider_next').on('click', function () {
            counter++;
            if (counter >= totalSlides) {
                counter = 0;
            }
            showSlide(counter);
        });

        $('#slider_prev').on('click', function () {
            counter--;
            if (counter < 0) {
                counter = totalSlides - 1;
            }
            showSlide(counter);
        });

        // STEP 1 -> STEP 2
        $('#go_to_step_2').on('click', function () {
            $('#title').html('<span class="number">2</span> Choose technical characteristics of ' + cars[counter]);
            $('#step_1').fadeOut(0);
            $('#step_2').fadeIn(350);

            // Populate engine & transmission based on selected car
            switch (counter) {
                case 0: // S500 Cabriolet AMG
                    $('#engine').html('<option value="Petrol 3.0">Petrol 3.0</option><option value="Petrol 3.5">Petrol 3.5</option>');
                    $('#transmission').html('<option value="Automatic">Automatic</option>');
                    break;
                case 1: // GLE 400 AMG
                    $('#engine').html('<option value="Petrol 3.0 Biturbo">Petrol 3.0 Biturbo</option><option value="Diesel 2.9">Diesel 2.9</option>');
                    $('#transmission').html('<option value="9G-TRONIC Automatic">9G-TRONIC Automatic</option>');
                    break;
                case 2: // GLC 250D 4MATIC (Fixed: OutOfMemoryError removed)
                    $('#engine').html('<option value="Diesel 2.1">Diesel 2.1</option><option value="Petrol 2.0">Petrol 2.0</option><option value="Diesel 2.5">Diesel 2.5</option>');
                    $('#transmission').html('<option value="Automatic">Automatic</option><option value="Manual">Manual</option>');
                    break;
                case 3: // CLA SB Standard
                    $('#engine').html('<option value="Petrol 2.0">Petrol 2.0</option><option value="Diesel 2.0">Diesel 2.0</option>');
                    $('#transmission').html('<option value="Automatic">Automatic</option><option value="Manual">Manual</option>');
                    break;
            }
        });

        // STEP 2 -> STEP 1 (BACK)
        $('#back_to_step_1').on('click', function () {
            $('#title').html('<span class="number">1</span> Choose the model');
            $('#step_2').fadeOut(0);
            $('#step_1').fadeIn(350);
        });

        // STEP 2 -> STEP 3
        $('#go_to_step_3').on('click', function () {
            // Sequential stepper fix: Step 3 is 3 (not 4)
            $('#title').html('<span class="number">3</span> Fill in your contact information');
            $('#step_2').fadeOut(0);
            $('#step_3').fadeIn(350);
        });

        // STEP 3 -> STEP 2 (BACK)
        $('#back_to_step_2').on('click', function () {
            $('#title').html('<span class="number">2</span> Choose technical characteristics of ' + cars[counter]);
            $('#step_3').fadeOut(0);
            $('#step_2').fadeIn(350);
        });

        // STEP 3 -> STEP 4 (VALIDATION GUARD)
        $('#contact_form').on('submit', function (event) {
            event.preventDefault();

            // Clear previous errors
            $('.form-input').removeClass('is-invalid');
            $('.field-error').text('');
            $('#validation_alert').hide().text('');

            var lastName = $('#form_last_name').val().trim();
            var firstName = $('#form_first_name').val().trim();
            var middleName = $('#form_middle_name').val().trim();
            var ageRaw = $('#form_age').val().trim();
            var phone = $('#form_phone').val().trim();

            var isValid = true;
            var errorMessages = [];

            // Name pattern: letters, spaces, hyphens, apostrophes (no digits or symbols)
            var nameRegex = /^[A-Za-zА-Яа-яЁё\s\-']+$/;

            // Last Name Validation
            if (!lastName) {
                $('#form_last_name').addClass('is-invalid');
                $('#error_last_name').text('Last name is required.');
                isValid = false;
                errorMessages.push('Last name is required.');
            } else if (lastName.length < 2) {
                $('#form_last_name').addClass('is-invalid');
                $('#error_last_name').text('Last name must be at least 2 characters.');
                isValid = false;
            } else if (!nameRegex.test(lastName)) {
                $('#form_last_name').addClass('is-invalid');
                $('#error_last_name').text('Last name must contain letters only (no numbers or special characters).');
                isValid = false;
                errorMessages.push('Last name must contain letters only.');
            }

            // First Name Validation
            if (!firstName) {
                $('#form_first_name').addClass('is-invalid');
                $('#error_first_name').text('First name is required.');
                isValid = false;
                errorMessages.push('First name is required.');
            } else if (firstName.length < 2) {
                $('#form_first_name').addClass('is-invalid');
                $('#error_first_name').text('First name must be at least 2 characters.');
                isValid = false;
            } else if (!nameRegex.test(firstName)) {
                $('#form_first_name').addClass('is-invalid');
                $('#error_first_name').text('First name must contain letters only (no numbers or special characters).');
                isValid = false;
                errorMessages.push('First name must contain letters only.');
            }

            // Middle Name Validation (if provided)
            if (middleName && !nameRegex.test(middleName)) {
                $('#form_middle_name').addClass('is-invalid');
                isValid = false;
                errorMessages.push('Middle name must contain letters only.');
            }

            // Age Validation (18 to 99)
            var age = parseInt(ageRaw, 10);
            if (!ageRaw || isNaN(age)) {
                $('#form_age').addClass('is-invalid');
                $('#error_age').text('Valid age is required.');
                isValid = false;
                errorMessages.push('Valid age is required.');
            } else if (age < 18 || age > 99) {
                $('#form_age').addClass('is-invalid');
                $('#error_age').text('Driver age must be between 18 and 99 years old.');
                isValid = false;
                errorMessages.push('Driver age must be between 18 and 99 years old.');
            }

            // Phone Validation
            var cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
            var phoneRegex = /^\+?[0-9]{9,15}$/;
            if (!phone || cleanPhone === '+375' || cleanPhone === '+') {
                $('#form_phone').addClass('is-invalid');
                $('#error_phone').text('Full phone number is required.');
                isValid = false;
                errorMessages.push('Full phone number is required.');
            } else if (!phoneRegex.test(cleanPhone)) {
                $('#form_phone').addClass('is-invalid');
                $('#error_phone').text('Please enter a valid international phone number.');
                isValid = false;
                errorMessages.push('Please enter a valid international phone number.');
            }

            if (!isValid) {
                $('#validation_alert').html('<strong>Please correct the errors below:</strong><br>' + errorMessages.join('<br>')).fadeIn(200);
                return false;
            }

            // Prepare Step 4 Data
            var transmission = $("#transmission option:selected").text();
            var engine = $("#engine option:selected").text();

            $('#step_4_car').text(cars[counter]);
            $('#step_4_equipment').text(engine + ' engine, ' + transmission + ' transmission');
            
            var fullName = lastName + ' ' + firstName + (middleName ? (' ' + middleName) : '');
            $('#step_4_name').text(fullName);
            $('#step_4_age').text(age);
            $('#step_4_phone').text(phone);

            // Advance to Step 4
            $('#title').html('<span class="number">4</span> Confirm the data');
            $('#step_3').fadeOut(0);
            $('#step_4').fadeIn(350);
        });

        // STEP 4 -> STEP 3 (BACK)
        $('#back_to_step_3').on('click', function () {
            $('#title').html('<span class="number">3</span> Fill in your contact information');
            $('#step_4').fadeOut(0);
            $('#step_3').fadeIn(350);
        });

        // STEP 4 -> STEP 5 (FINISH / CONFIRM)
        $('#finish').on('click', function (event) {
            event.preventDefault();
            $('#title').html('Thank you for booking the test drive!');
            $('#step_4').fadeOut(0);
            $('#step_5').fadeIn(350);
        });

        // STEP 5 -> RESTART BOOKING & HOME
        function resetWizard() {
            // Reset state
            counter = 0;
            showSlide(counter);
            $('#contact_form')[0].reset();
            $('#form_phone').val('+375');
            $('.form-input').removeClass('is-invalid');
            $('.field-error').text('');
            $('#validation_alert').hide();

            $('#title').html('<span class="number">1</span> Choose the model');
            $('#step_5').fadeOut(0);
            $('#step_1').fadeIn(350);
        }

        $('#restart_booking').on('click', resetWizard);
        $('#go_to_home').on('click', resetWizard);
    });
}(jQuery));
