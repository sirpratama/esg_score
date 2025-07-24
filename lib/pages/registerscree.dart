import 'package:flutter/material.dart';
import 'package:garudahack6/pages/landingscreen.dart';

  class RegisterScreen extends StatelessWidget {
    const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF39795B),
              Color(0xFFA8E063),
            ],
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Container(
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(40),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.08),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const SizedBox(height: 12),
                    //Image.asset('assets/logo.png', height: 64),
                    const Text(
                      'LOGO',
                      style: TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Register',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF39795B),
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Username
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Business Name',
                        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Password
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Category',
                        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Location (City)',
                        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Email',
                        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Phone Number',
                        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Login Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFE6FF6A),
                          foregroundColor: const Color(0xFF39795B),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          textStyle: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                          elevation: 0,
                        ),
                        child: const Text('Register'),
                      ),
                    ),
                    const SizedBox(height: 12),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
