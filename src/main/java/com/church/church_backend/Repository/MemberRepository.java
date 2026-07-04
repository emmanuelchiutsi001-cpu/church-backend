package com.church.church_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.church.church_backend.Entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
}
